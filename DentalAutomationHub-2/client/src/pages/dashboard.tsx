import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, LogOut, Settings, BarChart3, Users, Calendar, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access your dashboard.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-nude-light to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  const stats = [
    { title: "Active Automations", value: "12", icon: Bot, change: "+2 this month" },
    { title: "Messages Handled", value: "1,847", icon: MessageSquare, change: "+23% vs last month" },
    { title: "Patient Interactions", value: "324", icon: Users, change: "+15% vs last month" },
    { title: "Time Saved", value: "42h", icon: BarChart3, change: "This month" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-nude-light to-muted">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DentalAutomations</h1>
                <p className="text-sm text-gray-600">Practice Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profileImageUrl || ""} alt={user.firstName || "User"} />
                <AvatarFallback>
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName || "Doctor"}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your dental practice automation today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-teal-600" />
                Recent AI Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { message: "WhatsApp AI confirmed appointment for Sarah Johnson", time: "2 minutes ago", type: "appointment" },
                  { message: "Instagram DM handled insurance question", time: "15 minutes ago", type: "inquiry" },
                  { message: "Automated reminder sent to 12 patients", time: "1 hour ago", type: "reminder" },
                  { message: "New patient onboarding completed for Mike Chen", time: "2 hours ago", type: "onboarding" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-teal-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex-col bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200">
                  <Bot className="h-6 w-6 mb-2" />
                  <span className="text-sm">Configure AI</span>
                </Button>
                <Button className="h-20 flex-col bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">View Schedule</span>
                </Button>
                <Button className="h-20 flex-col bg-green-50 hover:bg-green-100 text-green-700 border border-green-200">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Patient List</span>
                </Button>
                <Button className="h-20 flex-col bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <Card className="mt-8 bg-gradient-to-r from-teal-500 to-green-500 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Your automation dashboard is being prepared!</h3>
            <p className="text-teal-100 mb-6">
              We're setting up your personalized automation workflows and will have everything ready soon.
              In the meantime, explore the demo or contact our team for a personalized setup.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                className="bg-white text-teal-600 hover:bg-gray-100"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = "/#demo"}
              >
                Schedule Setup Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}