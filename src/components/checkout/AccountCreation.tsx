
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface AccountCreationProps {
  onAccountCreated: () => void;
  isBusinessUser: boolean;
}

export const AccountCreation = ({ onAccountCreated, isBusinessUser }: AccountCreationProps) => {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  // Formulaire de connexion
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Formulaire d'inscription
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: isBusinessUser ? 'business' as const : 'customer' as const,
    companyName: '',
    companySector: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(signInData.email, signInData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect');
        } else {
          setError(error.message);
        }
      } else {
        onAccountCreated();
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await signUp({
        email: signUpData.email,
        password: signUpData.password,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        phone: signUpData.phone,
        userType: signUpData.userType,
        companyName: signUpData.userType === 'business' ? signUpData.companyName : undefined,
        companySector: signUpData.userType === 'business' ? signUpData.companySector : undefined,
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          setError('Un compte avec cet email existe déjà');
        } else {
          setError(error.message);
        }
      } else {
        onAccountCreated();
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Connexion ou création de compte</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin" className="text-sm">Se connecter</TabsTrigger>
            <TabsTrigger value="signup" className="text-sm">Créer un compte</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-0">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Connexion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connectez-vous à votre compte existant
              </p>
            </div>
            
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={signInData.email}
                  onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Se connecter
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-0">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Créer un compte</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Créez votre nouveau compte pour continuer
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={signUpData.phone}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div className="space-y-3">
                <Label>Type de compte</Label>
                <RadioGroup
                  value={signUpData.userType}
                  onValueChange={(value: 'customer' | 'business') => 
                    setSignUpData(prev => ({ ...prev, userType: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Particulier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business">Professionnel</Label>
                  </div>
                </RadioGroup>
              </div>

              {signUpData.userType === 'business' && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      value={signUpData.companyName}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Nom de votre entreprise"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySector">Secteur d'activité</Label>
                    <Input
                      id="companySector"
                      value={signUpData.companySector}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, companySector: e.target.value }))}
                      placeholder="Secteur d'activité"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="signup-password">Mot de passe</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Créer mon compte
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
