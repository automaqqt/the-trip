"use client"; // Accordion is interactive
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // shadcn/ui
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquareQuoteIcon } from "lucide-react";

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems: FAQItemProps[];
}

const FAQSection = ({ faqItems }: FAQSectionProps) => {
  if (!faqItems || faqItems.length === 0) {
    return (
      <section id="faq" className="py-16 md:py-24 bg-background dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <MessageSquareQuoteIcon className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
          <p className="text-xl text-muted-foreground">Keene Infos im Moment, kommt noch.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-background dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-tripTeal to-tripPurple">
              Gibts Fragen?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hier sind schonmal die Antworten auf deine Basic Fragen. Wenn irgendwas unklar ist wende dich gerne an Marv oder Lui.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-card/60 dark:bg-slate-800/70 border border-border/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-primary hover:no-underline hover:text-tripPink transition-colors duration-200 group">
                    <span className="flex items-center">
                      <HelpCircle className="w-5 h-5 mr-3 text-tripPurple group-hover:text-tripPink transition-colors duration-200" />
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0 text-base text-foreground/80 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;