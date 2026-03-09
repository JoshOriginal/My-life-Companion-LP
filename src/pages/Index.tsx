import { Phone, MessageCircle, MapPin, Shield, Users, Heart, Check, Star } from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";

const WHATSAPP_LINK = "https://wa.me/254118043715";
const PHONE_NUMBER = "+254 118 043 715";
const PHONE_LINK = "tel:+254118043715";

const Index = () => {
  const plans = [
    { option: 1, price: "1,500", principal: 50000, spouse: 50000, children: 50000, parents: 50000, extraChild: 300, parentAge80: 1000 },
    { option: 2, price: "3,000", principal: 100000, spouse: 100000, children: 100000, parents: 100000, extraChild: 500, parentAge80: 2000 },
    { option: 3, price: "6,000", principal: 200000, spouse: 200000, children: 100000, parents: 200000, extraChild: 500, parentAge80: 4000 },
    { option: 4, price: "9,000", principal: 300000, spouse: 300000, children: 100000, parents: 200000, extraChild: 500, parentAge80: 4000 },
    { option: 5, price: "12,000", principal: 400000, spouse: 400000, children: 100000, parents: 200000, extraChild: 500, parentAge80: 4000 },
    { option: 6, price: "15,000", principal: 500000, spouse: 500000, children: 100000, parents: 200000, extraChild: 500, parentAge80: 4000 },
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* HERO SECTION */}
      <section className="relative pt-6 md:pt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-warm-cream" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-center">
                {/* logo.png should be placed in the public folder */}
                <img src="/logo.png" alt="My Life Companion logo" className="h-24 md:h-32 w-auto" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Protect Your Family <span className="text-gradient-orange">When It Matters Most</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Affordable welfare support for Kenyan families during life's most difficult moments.
              </p>
              {/* Bullet points */}
              <div className="space-y-3">
                {[
                  "Covers principal member and spouse",
                  "Covers up to 4 children",
                  "Covers parents and parents-in-law",
                  "Parents covered up to 90 years",
                  "No exit age"
                ].map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{bullet}</span>
                  </div>
                ))}
              </div>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <MessageCircle className="w-6 h-6" /> Join via WhatsApp
                </a>
                <a href={PHONE_LINK} className="inline-flex items-center justify-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all">
                  <Phone className="w-6 h-6" /> Call Us
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={heroFamily} alt="Happy multi-generational Kenyan family smiling together" className="w-full h-auto object-cover" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FAMILIES JOIN */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Welfare Solution Designed for <span className="text-gradient-orange">Kenyan Families</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My Life Companion helps families avoid financial stress during funeral and emergency situations by providing structured welfare support that protects families when they need it most.
            </p>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Key Benefits
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Parents covered up to 90 years" },
              { icon: Shield, title: "No exit age" },
              { icon: Check, title: "Affordable annual contributions" },
              { icon: Heart, title: "Flexible welfare options" },
              { icon: Users, title: "Family-inclusive protection" },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WELFARE OPTIONS */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
            Choose the Welfare Plan That <span className="text-gradient-orange">Fits Your Family</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Affordable options designed for Kenyan families.
          </p>

          {/* desktop comparison table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full bg-background rounded-2xl shadow-2xl ring-1 ring-border">
              <thead>
                <tr>
                  <th className="p-4"></th>
                  {plans.map((p) => (
                    <th key={p.option} className={`p-4 text-center transition-transform transform hover:scale-105 ${p.price === "3,000" ? "bg-primary text-primary-foreground rounded-lg ring-4 ring-primary/30" : ""}`}>
                      <div className="font-display font-bold font-poppins">KES {p.price}</div>
                      <div className={`text-xs ${p.price === "3,000" ? "text-primary-foreground" : "text-muted-foreground"}`}>per year</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { label: "Principal Member", key: "principal" },
                  { label: "Spouse", key: "spouse" },
                  { label: "Children (Up to 4)", key: "children" },
                  { label: "Parents & Parents-in-law (Up to 4)", key: "parents" },
                  { label: "Additional Child Premium", key: "extraChild" },
                  { label: "Parents above 80 years premium", key: "parentAge80" },
                ].map((row) => (
                  <tr key={row.key} className="border-t border-border hover:bg-accent/30 transition-colors">
                    <td className="p-4 font-medium">{row.label}</td>
                    {plans.map((p) => (
                      <td key={p.option} className="p-4 text-center font-poppins">{formatNumber(p[row.key])}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td></td>
                  {plans.map((p) => (
                    <td key={p.option} className="p-4 text-center">
                      <a
                        href={`${WHATSAPP_LINK}?text=Hello%20I%20would%20like%20to%20join%20My%20Life%20Companion`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow"
                      >
                        <MessageCircle className="w-4 h-4" /> Join via WhatsApp
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="lg:hidden space-y-6">
            {plans.map((p) => (
              <div
                key={p.option}
                className={`bg-background rounded-xl p-6 shadow-md transition-transform transform hover:scale-105 ${p.price === "3,000" ? "border-2 border-primary" : ""}`}
              >
                <div className="text-center mb-4">
                  <p className="font-poppins text-2xl font-bold">KES {p.price}</p>
                  <p className="text-xs text-muted-foreground">per year</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Principal Member</span>
                    <span>{formatNumber(p.principal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spouse</span>
                    <span>{formatNumber(p.spouse)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Children (Up to 4)</span>
                    <span>{formatNumber(p.children)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parents & Parents-in-law</span>
                    <span>{formatNumber(p.parents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Child Premium</span>
                    <span>{formatNumber(p.extraChild)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parents above 80 years premium</span>
                    <span>{formatNumber(p.parentAge80)}</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <a
                    href={`${WHATSAPP_LINK}?text=Hello%20I%20would%20like%20to%20join%20My%20Life%20Companion`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow"
                  >
                    <MessageCircle className="w-4 h-4" /> Join via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6 text-center">
            Mandatory documents: Principal member’s copy of ID and KRA PIN, and spouse’s copy of ID.
          </p>
        </div>
      </section>

      {/* EMOTIONAL SECTION */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Because Family Should Never Be <span className="text-primary">Turned Away</span>
          </h2>
          <p className="text-lg opacity-90 leading-relaxed max-w-3xl mx-auto">
            Many plans reject elderly parents or impose strict age limits. At My Life Companion, we accept parents up to 90 years old with no exit age, ensuring your entire family is protected.
          </p>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ready to Protect Your Family?</h2>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">Join thousands of Kenyan families who trust My Life Companion for their welfare needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-card text-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-card/90 transition-all shadow-lg">
              <MessageCircle className="w-6 h-6 text-primary" /> Join on WhatsApp
            </a>
            <a href={PHONE_LINK} className="inline-flex items-center justify-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all border-2 border-secondary-foreground/20">
              <Phone className="w-6 h-6" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-3">
                My Life <span className="text-primary">Companion</span>
              </h3>
              <p className="text-sm opacity-80">Development House</p>
              <p className="text-sm opacity-80">13th Floor Suite 8</p>
              <p className="text-sm opacity-80">Nairobi Kenya</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Contact</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>Phone: {PHONE_NUMBER}</p>
                <p>Website: <a href="https://mylife-companion.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://mylife-companion.com</a></p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Social</h4>
              <div className="flex gap-3">
                <a href="https://www.tiktok.com/@life.companion97" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 hover:bg-primary rounded-full flex items-center justify-center transition-all">
                  <img src="/tiktok.png" alt="TikTok" className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61585006831766" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 hover:bg-primary rounded-full flex items-center justify-center transition-all">
                  <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/mylifecompanion01" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-secondary-foreground/10 hover:bg-primary rounded-full flex items-center justify-center transition-all">
                  <img src="/instagram.png" alt="Instagram" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/10 pt-6 text-center text-sm opacity-60">
            <p>© {new Date().getFullYear()} My Life Companion. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float" aria-label="Chat on WhatsApp">
          <img src="/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
};

export default Index;
