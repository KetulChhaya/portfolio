'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import emailjs from '@emailjs/browser';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'chhayaketul13@gmail.com',
    href: 'mailto:chhayaketul13@gmail.com',
    description: 'Best way to reach me',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ketul-chhaya',
    href: 'https://www.linkedin.com/in/ketul-chhaya/',
    description: 'Connect with me on LinkedIn',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Baltimore, MD',
    href: 'https://www.google.com/maps/place/Baltimore,+MD',
    description: 'Based in USA',
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/KetulChhaya',
    color: 'hover:text-[#333]',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ketul-chhaya',
    color: 'hover:text-[#0077B5]',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/ketulchhaya',
    color: 'hover:text-[#1DA1F2]',
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.warn('EmailJS public key not found in environment variables');
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email:
          process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'chhayaketul13@gmail.com',
      };

      // Get environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'EmailJS configuration is incomplete. Please check your environment variables.'
        );
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-responsive">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-7xl"
        >
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="mb-10 text-center lg:mb-12"
          >
            <motion.h2
              className="text-responsive-xl text-foreground mb-4 font-bold lg:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Get in Touch
              <div className="bg-border mx-auto mt-4 h-px w-20 lg:mt-6 lg:w-24"></div>
            </motion.h2>
          </motion.div>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-background/70 border-border/50 h-fit rounded-2xl border p-0 shadow-sm backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
                <div className="p-0 md:p-4 lg:p-6 xl:p-8">
                  <motion.h3
                    className="text-foreground mb-6 text-xl font-bold lg:mb-8 lg:text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Send me a message
                  </motion.h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      className="grid gap-4 sm:grid-cols-2 lg:gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-muted-foreground block text-sm font-semibold"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-background/50 border-border/50 focus:border-foreground focus:ring-foreground/20 h-12 rounded-xl transition-all duration-300 focus:ring-2"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-muted-foreground block text-sm font-semibold"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-background/50 border-border/50 focus:border-foreground focus:ring-foreground/20 h-12 rounded-xl transition-all duration-300 focus:ring-2"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label
                        htmlFor="subject"
                        className="text-muted-foreground block text-sm font-semibold"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-foreground focus:ring-foreground/20 h-12 rounded-xl transition-all duration-300 focus:ring-2"
                        placeholder="What's this about?"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <label
                        htmlFor="message"
                        className="text-muted-foreground block text-sm font-semibold"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={8}
                        className="bg-background/50 border-border/50 focus:border-foreground focus:ring-foreground/20 resize-none rounded-xl transition-all duration-300 focus:ring-2"
                        placeholder="Tell me about your project, idea, or just say hello!"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-muted-foreground hover:from-muted-foreground hover:to-foreground text-background group h-12 w-full cursor-pointer rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg lg:h-14 lg:text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="border-background h-4 w-4 animate-spin rounded-full border-2 border-t-transparent lg:h-5 lg:w-5"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 lg:h-5 lg:w-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </motion.div>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-600 dark:border-green-800 dark:bg-green-900/20"
                      >
                        <CheckCircle className="h-4 w-4 flex-shrink-0 lg:h-5 lg:w-5" />
                        <span className="text-sm font-medium lg:text-base">
                          Message sent successfully! I&apos;ll get back to you
                          soon.
                        </span>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/20"
                      >
                        <AlertCircle className="h-4 w-4 flex-shrink-0 lg:h-5 lg:w-5" />
                        <span className="text-sm font-medium lg:text-base">
                          Something went wrong. Please try again or email me
                          directly.
                        </span>
                      </motion.div>
                    )}
                  </form>
                </div>
              </Card>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div
              variants={fadeInUp}
              className="order-1 space-y-8 lg:order-2 lg:space-y-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Contact Methods */}
              <div className="space-y-4 lg:space-y-6">
                <motion.h3
                  className="text-foreground text-xl font-bold lg:text-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Let&apos;s connect!
                </motion.h3>
                <div className="space-y-3 lg:space-y-4">
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.a
                        key={method.label}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background/60 hover:bg-background/80 border-border/50 hover:border-border group flex items-center gap-4 rounded-2xl border p-4 shadow-lg transition-all duration-500 hover:shadow-xl lg:p-5"
                        whileHover={{ x: 6, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      >
                        <motion.div
                          className="from-muted/50 to-muted/30 group-hover:from-foreground/10 group-hover:to-foreground/5 rounded-xl bg-gradient-to-br p-2.5 transition-all duration-300"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <IconComponent
                            size={20}
                            className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-foreground mb-1 text-base font-semibold lg:text-lg">
                            {method.label}
                          </p>
                          <p className="text-muted-foreground mb-1 text-sm lg:text-base">
                            {method.value}
                          </p>
                          <p className="text-muted-foreground/60 text-xs lg:text-sm">
                            {method.description}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4 lg:space-y-6">
                <motion.div
                  className="flex flex-col gap-4 sm:flex-row sm:items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.h3 className="text-foreground text-xl font-bold lg:text-2xl">
                    Follow me
                  </motion.h3>
                  <div className="mb-2 flex gap-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-background/60 hover:bg-background text-muted-foreground rounded-xl p-3 transition-all duration-500 ${social.color} shadow-xs hover:shadow-xl`}
                          whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.8 + index * 0.1,
                          }}
                        >
                          <IconComponent size={20} />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
