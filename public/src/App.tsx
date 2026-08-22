import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { IridescentBlobBackground } from './components/IridescentBlobBackground';
import { CertificationsSection } from './components/Certificationssection';
import { BlogSection } from './components/BlogSection'

function App() {
  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black">
      <IridescentBlobBackground backgroundColor="#F1EFF6" />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}

export default App;