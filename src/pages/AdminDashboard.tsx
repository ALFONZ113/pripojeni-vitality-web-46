import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Add noindex meta tag on mount
const useNoIndex = () => {
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);
    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  LogOut, 
  Search, 
  Download, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Send,
  AlertCircle,
  Trash2,
  Share2,
  BookOpen,
  Bot
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  property_type?: string;
  current_provider?: string;
  current_price?: string;
  message?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  useNoIndex();
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [searchTerm, statusFilter, submissions]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login-poda-2024");
      return;
    }

    // Server-side admin role check using RLS-protected user_roles table
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      toast.error('Nedostatečná oprávnění', {
        description: 'Nemáte přístup do administrace. Kontaktujte správce.',
      });
      await supabase.auth.signOut();
      navigate("/");
      return;
    }

    setUser(user);
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Chyba načítání', {
        description: "Nepodařilo se načíst data",
      });
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('form_submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error('Chyba', {
        description: "Nepodařilo se změnit stav",
      });
    } else {
      toast.success('Úspěch', {
        description: "Stav byl změněn",
      });
      fetchSubmissions();
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedSubmission) return;

    const { error } = await supabase
      .from('form_submissions')
      .update({ admin_notes: adminNotes })
      .eq('id', selectedSubmission.id);

    if (error) {
      toast.error('Chyba', {
        description: "Nepodařilo se uložit poznámky",
      });
    } else {
      toast.success('Úspěch', {
        description: "Poznámky byly uloženy",
      });
      fetchSubmissions();
      setSelectedSubmission(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tento kontakt?')) return;

    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Chyba', {
        description: "Nepodařilo se smazat kontakt",
      });
    } else {
      toast.success('Úspěch', {
        description: "Kontakt byl smazán",
      });
      fetchSubmissions();
      setSelectedSubmission(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Jméno', 'Email', 'Telefon', 'Adresa', 'Město', 'PSČ', 'Typ nemovitosti', 'Současný poskytovatel', 'Současná cena', 'Zpráva', 'Stav', 'Poznámky', 'Vytvořeno'];
    const csvData = filteredSubmissions.map(sub => [
      sub.name,
      sub.email,
      sub.phone,
      sub.address || '',
      sub.city || '',
      sub.zip || '',
      sub.property_type || '',
      sub.current_provider || '',
      sub.current_price || '',
      sub.message || '',
      sub.status,
      sub.admin_notes || '',
      new Date(sub.created_at).toLocaleString('cs-CZ')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `poda-formulare-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login-poda-2024");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="default" className="bg-blue-500"><Clock className="h-3 w-3 mr-1" />Nová</Badge>;
      case 'processing':
        return <Badge variant="default" className="bg-yellow-500"><MessageSquare className="h-3 w-3 mr-1" />Zpracovává se</Badge>;
      case 'contacted':
        return <Badge variant="default" className="bg-purple-500"><Phone className="h-3 w-3 mr-1" />Kontaktováno</Badge>;
      case 'contract_sent':
        return <Badge variant="default" className="bg-indigo-500"><Send className="h-3 w-3 mr-1" />Smlouva odeslána</Badge>;
      case 'contract_signed':
        return <Badge variant="default" className="bg-emerald-500"><FileText className="h-3 w-3 mr-1" />Smlouva podepsána</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Dokončeno</Badge>;
      case 'cancelled':
        return <Badge variant="default" className="bg-gray-500"><AlertCircle className="h-3 w-3 mr-1" />Zrušeno</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Zamítnuto</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    processing: submissions.filter(s => s.status === 'processing').length,
    completed: submissions.filter(s => s.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Administrace PODA</h1>
            <p className="text-muted-foreground">Správa formulářových žádostí</p>
          </div>
          
          {/* Rýchla navigácia */}
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="default" 
              onClick={() => navigate('/admin/social-generator')}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Social Generator</span>
              <span className="sm:hidden">Social</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/ai-blog-manager')}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">AI Blog</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/ai-automation')}
              className="gap-2"
            >
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Automácie</span>
            </Button>
            
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Odhlásit se</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Celkem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Nové</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Zpracovává se</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.processing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dokončeno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Žádosti</CardTitle>
            <CardDescription>Seznam všech formulářových žádostí</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Hledat podle jména, emailu nebo telefonu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtr podle stavu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všechny stavy</SelectItem>
                  <SelectItem value="new">Nové</SelectItem>
                  <SelectItem value="processing">Zpracovává se</SelectItem>
                  <SelectItem value="contacted">Kontaktováno</SelectItem>
                  <SelectItem value="contract_sent">Smlouva odeslána</SelectItem>
                  <SelectItem value="contract_signed">Smlouva podepsána</SelectItem>
                  <SelectItem value="completed">Dokončeno</SelectItem>
                  <SelectItem value="cancelled">Zrušeno</SelectItem>
                  <SelectItem value="rejected">Zamítnuto</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Jméno</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Adresa</TableHead>
                    <TableHead>Stav</TableHead>
                    <TableHead>Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Načítání...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Žádné žádosti
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(submission.created_at).toLocaleDateString('cs-CZ')}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <a href={`tel:${submission.phone}`} className="hover:underline">
                                {submission.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <a href={`mailto:${submission.email}`} className="hover:underline">
                                {submission.email}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.address && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {submission.address}, {submission.city}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setAdminNotes(submission.admin_notes || '');
                            }}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail žádosti</DialogTitle>
            <DialogDescription>
              Vytvořeno: {selectedSubmission && new Date(selectedSubmission.created_at).toLocaleString('cs-CZ')}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Jméno</Label>
                  <p className="mt-1">{selectedSubmission.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="mt-1">{selectedSubmission.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Telefon</Label>
                  <p className="mt-1">{selectedSubmission.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Město</Label>
                  <p className="mt-1">{selectedSubmission.city || '-'}</p>
                </div>
              </div>

              {selectedSubmission.address && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Adresa</Label>
                  <p className="mt-1">{selectedSubmission.address}, {selectedSubmission.zip}</p>
                </div>
              )}

              {selectedSubmission.property_type && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Typ nemovitosti</Label>
                  <p className="mt-1">{selectedSubmission.property_type}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedSubmission.current_provider && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Současný poskytovatel</Label>
                    <p className="mt-1">{selectedSubmission.current_provider}</p>
                  </div>
                )}
                {selectedSubmission.current_price && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Současná cena</Label>
                    <p className="mt-1">{selectedSubmission.current_price}</p>
                  </div>
                )}
              </div>

              {selectedSubmission.message && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Zpráva</Label>
                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedSubmission.message}</p>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Stav</Label>
                <Select
                  value={selectedSubmission.status}
                  onValueChange={(value) => handleStatusChange(selectedSubmission.id, value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[100] bg-background">
                    <SelectItem value="new">Nová</SelectItem>
                    <SelectItem value="processing">Zpracovává se</SelectItem>
                    <SelectItem value="contacted">Kontaktováno</SelectItem>
                    <SelectItem value="contract_sent">Smlouva odeslána</SelectItem>
                    <SelectItem value="contract_signed">Smlouva podepsána</SelectItem>
                    <SelectItem value="completed">Dokončeno</SelectItem>
                    <SelectItem value="cancelled">Zrušeno</SelectItem>
                    <SelectItem value="rejected">Zamítnuto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="adminNotes">Poznámky administrátora</Label>
                <Textarea
                  id="adminNotes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Přidejte poznámky..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex justify-between gap-2">
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(selectedSubmission.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Smazat kontakt
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                    Zavřít
                  </Button>
                  <Button onClick={handleSaveNotes}>
                    Uložit poznámky
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
