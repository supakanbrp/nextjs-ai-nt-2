import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { RiFacebookLine, RiInstagramLine, RiTwitterXLine } from "@remixicon/react";
import { ContactForm } from "./contact-form";

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="flex min-h-screen justify-center px-6 py-20">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          Contact Us
        </h2>
        <p className="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
          For more information or to contact our team
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: contact info */}
          <section className="flex flex-col gap-8">
            <div className="space-y-6">
              <ContactItem icon={<MapPin className="size-5" />} title="Address">
                <p className="mt-1 text-muted-foreground">
                  123 Example Road, Bang Rak Subdistrict, Bang Rak District, Bangkok 10500
                </p>
              </ContactItem>

              <ContactItem icon={<Phone className="size-5" />} title="Phone">
                <p className="mt-1 text-muted-foreground">
                  <a href="tel:029999999" className="hover:text-foreground">
                    02-999-9999
                  </a>
                </p>
              </ContactItem>

              <ContactItem icon={<Mail className="size-5" />} title="Email">
                <p className="mt-1 text-muted-foreground">
                  <a href="mailto:contact@toei-nt.com" className="hover:text-foreground">
                    contact@toei-nt.com
                  </a>
                </p>
              </ContactItem>

              <ContactItem icon={<Clock className="size-5" />} title="Business Hours">
                <p className="mt-1 text-muted-foreground">
                  Monday - Friday 09:00 - 18:00
                  <br />
                  Saturday - Sunday 10:00 - 16:00
                </p>
              </ContactItem>
            </div>

            <div>
              <h3 className="font-medium text-xl tracking-[-0.015em]">Social</h3>
              <div className="mt-3 flex items-center gap-4">
                <SocialLink href="#" label="Facebook" icon={<RiFacebookLine className="size-5" />} />
                <SocialLink href="#" label="Instagram" icon={<RiInstagramLine className="size-5" />} />
                <SocialLink href="#" label="Twitter / X" icon={<RiTwitterXLine className="size-5" />} />
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="font-medium text-xl tracking-[-0.015em]">
                Frequently Asked Questions
              </h3>
              <dl className="mt-4 space-y-4">
                <FaqItem
                  q="How many days does it take to get a response?"
                  a="We will reply within 1-2 business days after receiving your message"
                />
                <FaqItem
                  q="Do you support inquiries about courses?"
                  a="Yes, we are happy to provide guidance on all our courses and programs"
                />
                <FaqItem
                  q="Can I request a product quotation?"
                  a="Yes, send your requirements through the form on the right and our team will contact you back"
                />
                <FaqItem
                  q="Are there other contact channels?"
                  a="Yes, you can reach us via email, phone, or the social channels above"
                />
              </dl>
            </div>
          </section>

          {/* Right: contact form */}
          <section>
            <div className="rounded-xl border p-6">
              <h3 className="font-medium text-xl tracking-[-0.015em]">
                Send Us a Message
              </h3>
              <p className="mt-1 text-muted-foreground">
                Fill in the information below and we will get back to you as soon as possible
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="underline text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl border text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-medium tracking-[-0.015em]">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-xl border text-muted-foreground transition-colors hover:text-foreground"
    >
      {icon}
    </a>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-medium text-sm">{q}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{a}</dd>
    </div>
  );
}