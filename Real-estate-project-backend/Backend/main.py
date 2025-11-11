# Backend/main.py
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional
from pathlib import Path
import numpy as np
import pandas as pd
import joblib

APP_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = APP_DIR.parent
MODEL_PATH = PROJECT_ROOT / "app" / "xgboost_best.pkl"

# Load the full sklearn Pipeline (preprocess + model)
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    raise RuntimeError(
        "Failed to load model from app/xgboost_best.pkl. "
        "Often this is a version mismatch (xgboost/sklearn). "
        f"Original error: {type(e).__name__}: {e}"
    )

# Try to grab the raw-training columns the preprocessor expects
prep = None
train_columns = None
try:
    prep = model.named_steps["prep"]  # the ColumnTransformer in your Pipeline
    if hasattr(prep, "feature_names_in_"):
        train_columns = list(prep.feature_names_in_)
except Exception:
    pass

app = FastAPI(title="House Price Predictor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RawRow(BaseModel):
    # send raw Kaggle-style features here; you don't need to include all 80
    features_by_name: Dict[str, float]

@app.get("/")
def root():
    return {"message": "House Price Predictor API is running"}

@app.get("/health")
def health():
    return {
        "ok": True,
        "model_loaded": model is not None,
        "has_prep": prep is not None,
        "n_raw_columns_expected": len(train_columns) if train_columns else None,
    }

@app.get("/columns")
def columns():
    if not train_columns:
        raise HTTPException(
            status_code=500,
            detail="Could not determine training raw columns (prep.feature_names_in_ missing).",
        )
    return {"feature_count": len(train_columns), "columns": train_columns}

@app.post("/predict")
def predict(payload: RawRow):
    # Build a 1-row DataFrame from the provided raw features
    X = pd.DataFrame([payload.features_by_name])

    # Align to the exact raw columns the preprocessor expects
    if train_columns:
        X = X.reindex(columns=train_columns)
        # keep provided values; missing columns become NaN (the pipeline should handle them)

    try:
        y = model.predict(X)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model prediction failed: {type(e).__name__}: {e}")

    # Return a float for convenience
    return {"prediction": float(np.asarray(y).ravel()[0])}
