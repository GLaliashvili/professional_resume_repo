import React from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CompanyLogo } from "./CompanyLogo";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Resume() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-background">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="mb-2">George Laliashvili</h1>
        <p className="text-muted-foreground mb-4">Product Leader & Ex-Founder</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <a 
            href="mailto:hi@iamgeorge.nl" 
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            hi@iamgeorge.nl
          </a>
          <a 
            href="https://wa.me/+31655914658" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            +31 655 914 658
          </a>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Amsterdam, NL
          </div>
          <a 
            href="https://www.linkedin.com/in/georgelaliashvili/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            /in/georgelaliashvili
          </a>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="mb-4 text-primary">Summary</h2>
        <p className="text-muted-foreground leading-relaxed">
          I am a product manager with 12+ years of experience of building and launching SaaS, marketplaces, and consumer apps from the ground up.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          My background spans startups and scale-ups across revenue growth management, productivity, and sustainability areas. I build with the problem-first approach and lead by focusing on small wins that shape the overall product experience for users.
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-8">
        <h2 className="mb-6 text-primary">Experience</h2>
        
        <div className="space-y-6">
         
          {/* Scaler */}
          <Card className="p-6 relative">
            <CompanyLogo companyName="Scaler" logoUrl="https://i.imgur.com/K3u6SHN.png" />
            <div className="mb-0.5">
              <h3 className="text-primary">Scaler</h3>
            </div>
            <div className="flex justify-between items-start mb-0">
              <div>
                <h4 className="text-primary">Senior Product Manager</h4>
              </div>
              <span className="text-sm text-muted-foreground">Oct 2024 – Present</span>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Leading structured product scoring to boost clarity and consistency to prioritization.</li>
              <li>• Working closely with high-impact clients to translate critical ESG reporting needs into product outcomes.</li>
              <li>• Guiding cross-functional teams focused on data collection and analytics.</li>
              <li>• Building scalable frameworks to strengthen regulatory compliance across multiregional portfolios.</li>
            </ul>
          </Card>

          {/* Buynomics */}
          <Card className="p-6 relative">
            <CompanyLogo companyName="Buynomics" logoUrl="https://i.imgur.com/YRs5baQ.jpeg" />
            <div className="mb-0.5">
              <h3 className="text-primary">Buynomics</h3>
            </div>
            <div className="flex justify-between items-start mb-0">
              <div>
                <h4 className="text-primary">Product Manager</h4>
              </div>
              <span className="text-sm text-muted-foreground">Jan 2024 – Oct 2024</span>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Designed and launched a goal-based pricing simulation tool helping customers hit business KPIs.</li>
              <li>• Built a pricing simulation changelog enabling efficient collaboration across multi-account clients.</li>
              <li>• Enhanced core platform architecture by redesigning the internal admin system, data hierarchies, and user access management.</li>
            </ul>
          </Card>

          {/* Stack Browser - Multiple Roles */}
          <Card className="p-6 relative">
            <CompanyLogo companyName="Stack Browser" logoUrl="https://i.imgur.com/V4AcZQp.jpeg" />
            <div className="mb-2">
              <h3 className="text-primary">Stack Browser</h3>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0.5 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {/* CEO Role */}
                <div className="relative flex gap-4">
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-primary">Chief Executive Officer</h4>
                      </div>
                      <span className="text-sm text-muted-foreground">Jan 2022 – Jan 2024</span>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Led global user research and customer development to validate new growth opportunities.</li>
                      <li>• Oversaw product discovery and innovation, piloting new features to support continuous growth.</li>
                      <li>• Fostered a culture of experimentation, design excellence, and data-driven decision making.</li>
                    </ul>
                  </div>
                </div>

                {/* Head of Product Role */}
                <div className="relative flex gap-4">
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-primary">Founder & Head of Product</h4>
                      </div>
                      <span className="text-sm text-muted-foreground">May 2018 – Jan 2022</span>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Launched beta and generated $120K in the first 3 months.</li>
                      <li>• Built 70% of high-impact features in first 12 months, boositng NPS from 34 to 66.</li>
                      <li>• Grew user base 3x utilizing network effect with social features (shared workspaces).</li>
                      <li>• Led technical migration from ElectronJS to Chromium.</li>
                      <li>• Increased activation rate by 40% through UX experimentation and A/B testing.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Georgia's Innovation & Technology Agency - Multiple Roles */}
          <Card className="p-6 relative">
            <CompanyLogo companyName="Georgia's Innovation & Technology Agency" logoUrl="https://i.imgur.com/P9Trrg8.png" />
            <div className="mb-2">
              <h3 className="text-primary">Georgia's Innovation & Technology Agency</h3>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0.5 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {/* Senior Product Manager Role */}
                <div className="relative flex gap-4">
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-primary">Senior Product Manager</h4>
                      </div>
                      <span className="text-sm text-muted-foreground">Apr 2016 – May 2018</span>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Built international mentor network (90 experts) and co-working space for 140+ entrepreneurs.</li>
                      <li>• Designed and ran a pre-acceleration program; 8 of 30 companies raised $4.3M post-program.</li>
                    </ul>
                  </div>
                </div>

                {/* Product Owner Role */}
                <div className="relative flex gap-4">
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-primary">Product Owner</h4>
                      </div>
                      <span className="text-sm text-muted-foreground">Jan 2016 – Apr 2016</span>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Launched Georgia's first business incubator; 20% of first batch startups raised funding.</li>
                      <li>• Guided startups through MVP development, Demo Day, and investor readiness.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* NextMart */}
          <Card className="p-6 relative">
            <CompanyLogo companyName="NextMart" logoUrl="https://i.imgur.com/uM9RfnJ.jpeg" />
            <div className="mb-0.5">
              <h3 className="text-primary">NextMart</h3>
            </div>
            <div className="flex justify-between items-start mb-0">
              <div>
                <h4 className="text-primary">Head of Product</h4>
              </div>
              <span className="text-sm text-muted-foreground">May 2014 – Jan 2016</span>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Transitioned business from hardware to mobile marketplace app.</li>
              <li>• Established 42 B2B partnerships, scaled shoppers from 100 to 7,000 in 8 months.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="mb-6 text-primary">Education</h2>
        
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-primary">Master of Arts, Economic Policy and Diplomacy</h3>
                <p className="text-muted-foreground">Tbilisi State University, Georgia</p>
              </div>
              <span className="text-sm text-muted-foreground">2011 - 2013</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-primary">Bachelor of Science, Physics</h3>
                <p className="text-muted-foreground">Tbilisi State University, Georgia</p>
              </div>
              <span className="text-sm text-muted-foreground">2007 - 2011</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Licenses & Certifications */}
      <section className="mb-8">
        <h2 className="mb-6 text-primary">Certifications</h2>
        <div className="space-y-4">
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-primary">Emergency Response Officer</h3>
                <p className="text-muted-foreground">BHVNederland</p>
              </div>
              <span className="text-sm text-muted-foreground">Jul 2025</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <a 
                  href="https://www.linkedin.com/learning/certificates/8c33bb46f9ea3f72e9ed39c573f83ba55f56e8cd44721c806e4f14b0f45cc610?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B3cIlr7UIQTq0TUj3pczkbA%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary/80 hover:scale-102 transition-all duration-200 ease-in-out inline-block"
                >
                  <h3 className="text-primary">Product Management Professional</h3>
                </a>
                <p className="text-muted-foreground">Aha!</p>
              </div>
              <span className="text-sm text-muted-foreground">Oct 2023</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <a 
                  href="https://www.linkedin.com/learning/certificates/7cfb54e163cb9c8e03b61263f45af8c2519b22a291cfd64123de598df58e1030" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary/80 hover:scale-102 transition-all duration-200 ease-in-out inline-block"
                >
                  <h3 className="text-primary">Scrum Master</h3>
                </a>
                <p className="text-muted-foreground">Project Management Institute</p>
              </div>
              <span className="text-sm text-muted-foreground">Oct 2023</span>
            </div>
          </Card>
          
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="mb-6 text-primary">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-primary mb-3">Product & Business Skills</h3>
            <div className="flex flex-wrap gap-2">
              {/*
              <Badge variant="secondary">Agile</Badge>
              <Badge variant="secondary">Scrum</Badge>
              <Badge variant="secondary">Kanban</Badge>
              <Badge variant="secondary">Budget control</Badge>
              <Badge variant="secondary">Change management</Badge>
              <Badge variant="secondary">Stakeholder management</Badge>
              <Badge variant="secondary">Strategy development</Badge>
              <Badge variant="secondary">Financial projections</Badge>
              <Badge variant="secondary">Fundraising</Badge>
              <Badge variant="secondary">Business modeling</Badge>
              <Badge variant="secondary">Product innovation</Badge>
              <Badge variant="secondary">Crisis management</Badge>
              <Badge variant="secondary">Public speaking</Badge>
              <Badge variant="secondary">Vision development</Badge>
              <Badge variant="secondary">Customer discovery</Badge>
              <Badge variant="secondary">GTM</Badge>
              <Badge variant="secondary">Leadership</Badge>
              <Badge variant="secondary">Mentorship</Badge>
              <Badge variant="secondary">A/B testing</Badge>
              <Badge variant="secondary">APIs</Badge>
              <Badge variant="secondary">Low-code MVPs</Badge>
              <Badge variant="secondary">Crisis management</Badge>
              <Badge variant="secondary">User empathy</Badge>
              */}
              
              <Badge variant="secondary">Business strategy</Badge>
              <Badge variant="secondary">Vision development</Badge>
              <Badge variant="secondary">Change management</Badge>
              <Badge variant="secondary">Stakeholder management</Badge>
              <Badge variant="secondary">Public speaking</Badge>
              <Badge variant="secondary">GTM strategy</Badge>
              <Badge variant="secondary">Customer discovery</Badge>
              <Badge variant="secondary">Leadership</Badge>
              <Badge variant="secondary">Mentorship</Badge>
              
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-primary mb-3">Tools & Technical Proficiency</h3>
            <div className="flex flex-wrap gap-2">
              {/*
              <Badge variant="secondary">Jira</Badge>
              <Badge variant="secondary">Asana</Badge>
              <Badge variant="secondary">Clickup</Badge>
              <Badge variant="secondary">Atlassian suite</Badge>
              <Badge variant="secondary">Linear</Badge>
              <Badge variant="secondary">HubSpot</Badge>
              <Badge variant="secondary">Intercom</Badge>
              <Badge variant="secondary">Notion</Badge>
              <Badge variant="secondary">Miro</Badge>
              <Badge variant="secondary">Figma</Badge>
              <Badge variant="secondary">Airtable</Badge>
              <Badge variant="secondary">Excel</Badge>
              <Badge variant="secondary">Google suite</Badge>
              <Badge variant="secondary">MS suite</Badge>
              <Badge variant="secondary">Canny</Badge>
              <Badge variant="secondary">Typeform</Badge>
              <Badge variant="secondary">Craft</Badge>
              <Badge variant="secondary">Slack</Badge>
              <Badge variant="secondary">Metabase</Badge>
              <Badge variant="secondary">Postgres</Badge>
              <Badge variant="secondary">SQL</Badge>
              <Badge variant="secondary">Webflow</Badge>
              <Badge variant="secondary">Mixpanel</Badge>
              <Badge variant="secondary">ERP</Badge>
              <Badge variant="secondary">CRM</Badge>
              */}
              <Badge variant="secondary">Data querying</Badge>
              <Badge variant="secondary">Data analytics</Badge>
              <Badge variant="secondary">Roadmapping</Badge>
              <Badge variant="secondary">A/B testing</Badge>
              <Badge variant="secondary">Product analytics</Badge>
              <Badge variant="secondary">Webflow</Badge>
              <Badge variant="secondary">Figma</Badge>
              <Badge variant="secondary">Low-code MVPs</Badge>
              <Badge variant="secondary">APIs</Badge>
              
            </div>
          </Card>
        </div>
      </section>

      {/* Projects */}
      
      {/*<section className="mb-8">
        <h2 className="mb-6 text-primary">Key Projects</h2>
        
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-primary mb-2">E-Commerce Dashboard</h3>
            <p className="text-muted-foreground mb-3">
              Built a comprehensive admin dashboard for managing products, orders, and analytics. 
              Features real-time data updates and interactive charts.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Recharts</Badge>
              <Badge variant="outline">REST API</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-primary mb-2">Task Management App</h3>
            <p className="text-muted-foreground mb-3">
              Developed a collaborative task management application with drag-and-drop functionality, 
              real-time updates, and team collaboration features.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Redux</Badge>
              <Badge variant="outline">WebSocket</Badge>
              <Badge variant="outline">Material-UI</Badge>
            </div>
          </Card>
        </div>
      </section>
      */}

      <Separator className="mb-8" />

      {/* Footer */}
      <footer className="text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>George Laliashvili  •  2025</span>
          
          {/*
          <a 
            href="https://x.com/GLaliashvili" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <ImageWithFallback
              src="https://i.imgur.com/XSmOdyN.png"
              alt="Social icon 1"
              className="w-[14px] h-[14px] rounded object-cover"
              width={14}
              height={14}
            />
          </a>
          
          <a 
            href="https://flic.kr/ps/41MzZx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <ImageWithFallback
              src="https://i.imgur.com/GJCzPA2.png"
              alt="Social icon 2"
              className="w-[14px] h-[14px] rounded object-cover"
              width={14}
              height={14}
            />
          </a>
          
          
          <span>2025</span>
           */}
          
        </div>
      </footer>
    </div>
  );
}