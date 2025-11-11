import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ValuationResults, type ValuationInput } from "@/components/ValuationResults";

const PredictPage = () => {
  const [form, setForm] = useState<ValuationInput>({
    address: "",
    sqft: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    yearBuilt: undefined,
  });
  const [submitted, setSubmitted] = useState<ValuationInput | undefined>(undefined);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ ...form });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">Predict</h1>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Enter a property address and details to instantly predict its value with Estate Luxe’s AI model.
            </p>

            <Card className="glass p-6 border-border/50 mb-10">
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Property address"
                    value={form.address || ""}
                    onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
                    className="h-12"
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Square feet"
                  value={form.sqft ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, sqft: Number(e.target.value) || undefined }))}
                  className="h-12"
                />
                <Input
                  type="number"
                  placeholder="Bedrooms"
                  value={form.bedrooms ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, bedrooms: Number(e.target.value) || undefined }))}
                  className="h-12"
                />
                <Input
                  type="number"
                  placeholder="Bathrooms"
                  value={form.bathrooms ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, bathrooms: Number(e.target.value) || undefined }))}
                  className="h-12"
                />
                <Input
                  type="number"
                  placeholder="Year built"
                  value={form.yearBuilt ?? ""}
                  onChange={(e) => setForm((s) => ({ ...s, yearBuilt: Number(e.target.value) || undefined }))}
                  className="h-12"
                />
                <div className="md:col-span-2 flex gap-3">
                  <Button type="submit" className="btn-premium">Predict Value</Button>
                  <Button type="button" variant="outline" onClick={() => { setForm({ address: "", sqft: undefined, bedrooms: undefined, bathrooms: undefined, yearBuilt: undefined }); setSubmitted(undefined); }}>Clear</Button>
                </div>
              </form>
            </Card>

            {/* Results */}
            <div>
              <ValuationResults input={submitted} stickyHeader={false} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PredictPage;
