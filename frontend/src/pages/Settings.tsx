import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Code, User, Shield, Trash2, Palette, Sun, Moon, Bell, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';

const Settings = () => {
  // Mock settings data
  const [settings, setSettings] = useState({
    fontSize: '14',
    theme: 'monokai',
    tabSize: 2,
    wordWrap: true,
    autoComplete: true,
    showLineNumbers: true,
    colorScheme: 'dark',
    animations: true,
    compactMode: false,
    darkMode: true,
    emailNotifications: true,
    pushNotifications: false,
    streakReminders: true
  });

  const updateSettings = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveEditorSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your editor preferences have been updated successfully."
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password change",
      description: "Password change functionality will be implemented with backend integration."
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "This feature requires backend integration to implement safely.",
      variant: "destructive"
    });
  };

  return (
    <AppLayout>
      <div className="p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Settings
            </h1>
          </div>

          <div className="grid gap-6">
            {/* Editor Preferences */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" />
                  Editor Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select value={settings.fontSize} onValueChange={(value) => updateSettings('fontSize', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12px</SelectItem>
                        <SelectItem value="14">14px (Default)</SelectItem>
                        <SelectItem value="16">16px</SelectItem>
                        <SelectItem value="18">18px</SelectItem>
                        <SelectItem value="20">20px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Editor Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSettings('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monokai">Monokai</SelectItem>
                        <SelectItem value="solarized-dark">Solarized Dark</SelectItem>
                        <SelectItem value="solarized-light">Solarized Light</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="dracula">Dracula</SelectItem>
                        <SelectItem value="one-dark">One Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lineNumbers">Show Line Numbers</Label>
                      <p className="text-sm text-muted-foreground">Display line numbers in the code editor</p>
                    </div>
                    <Switch 
                      id="lineNumbers"
                      checked={settings.showLineNumbers}
                      onCheckedChange={(checked) => updateSettings('showLineNumbers', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="wordWrap">Word Wrap</Label>
                      <p className="text-sm text-muted-foreground">Wrap long lines in the editor</p>
                    </div>
                    <Switch 
                      id="wordWrap"
                      checked={settings.wordWrap}
                      onCheckedChange={(checked) => updateSettings('wordWrap', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoComplete">Auto Complete</Label>
                      <p className="text-sm text-muted-foreground">Enable auto-completion suggestions</p>
                    </div>
                    <Switch 
                      id="autoComplete"
                      checked={settings.autoComplete}
                      onCheckedChange={(checked) => updateSettings('autoComplete', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-accent" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <Switch 
                      id="darkMode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => updateSettings('darkMode', checked)}
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">Show smooth transitions and animations</p>
                  </div>
                  <Switch 
                    id="animations"
                    checked={settings.animations}
                    onCheckedChange={(checked) => updateSettings('animations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content on screen</p>
                  </div>
                  <Switch 
                    id="compactMode"
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => updateSettings('compactMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-secondary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSettings('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get browser notifications</p>
                  </div>
                  <Switch 
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSettings('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="streakReminders">Streak Reminders</Label>
                    <p className="text-sm text-muted-foreground">Daily reminders to maintain your streak</p>
                  </div>
                  <Switch 
                    id="streakReminders"
                    checked={settings.streakReminders}
                    onCheckedChange={(checked) => updateSettings('streakReminders', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-destructive" />
                  Account Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-base font-medium">Change Password</Label>
                    <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure</p>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input 
                          id="currentPassword"
                          type="password" 
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword"
                          type="password" 
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword"
                          type="password" 
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button onClick={handleChangePassword} className="bg-primary">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium text-destructive">Danger Zone</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSaveEditorSettings} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
