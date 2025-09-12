import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MainChatBot from "@/components/MainChatBot";
import ConsultationSection from "@/components/ConsultationSection";
import ResourcesSection from "@/components/ResourcesSection";
import DailyQuestions from "@/components/DailyQuestions";
import DailyDiary from "@/components/DailyDiary";
import GoalsSection from "@/components/GoalsSection";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      <HeroSection />
      <MainChatBot />
      <ConsultationSection />
      <DailyQuestions />
      <DailyDiary />
      <GoalsSection />
      <ResourcesSection />
      <Footer />
    </div>
  );
};

export default Index;
