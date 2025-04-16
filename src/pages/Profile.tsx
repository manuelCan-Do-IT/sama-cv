
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogOut, Settings, User } from "lucide-react";

type Profile = {
  id: string;
  full_name: string | null;
  profile_type: string | null;
  bio: string | null;
  education: string | null;
  experience: string | null;
  skills: string[] | null;
  phone: string | null;
  address: string | null;
  website: string | null;
};

export default function Profile() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {language === "fr" ? "Profil" : 
             language === "en" ? "Profile" : 
             language === "es" ? "Perfil" : 
             "Profil"}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/profile/settings")}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
            {profile?.profile_type && (
              <span className="text-muted-foreground">{profile.profile_type}</span>
            )}
          </div>

          <div className="mt-8 space-y-6">
            {profile?.bio && (
              <div>
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            )}

            {profile?.skills && profile.skills.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
