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
import { toast } from "sonner";
import {
  LogOut,
  Search,
  Plus,
  FileText,
  Eye,
  Trash2,
  Calendar,
  TrendingUp,
  BarChart,
  RefreshCw,
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

interface AIBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  category: string;
  tags: string[];
  seo_score: number;
  views_count: number;
  created_at: string;
  published_at: string | null;
  indexed_by_google: boolean;
  header_image_url: string | null;
}

const AIBlogManager = () => {
  useNoIndex();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<AIBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<AIBlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState<AIBlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPosts();
    fetchStats();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, statusFilter, posts]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login-poda-2024");
      return;
    }
    setUser(user);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('ai_blog_posts' as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Chyba načítání', {
        description: "Nepodařilo se načíst články",
      });
    } else {
      setPosts((data as any) || []);
    }
    setIsLoading(false);
  };

  const fetchStats = async () => {
    // Calculate stats directly from posts data
    const { data: allPosts } = await supabase
      .from('ai_blog_posts' as any)
      .select('status, seo_score, views_count, indexed_by_google');
    
    if (allPosts) {
      const calculatedStats = {
        total_posts: allPosts.length,
        published: allPosts.filter((p: any) => p.status === 'published').length,
        drafts: allPosts.filter((p: any) => p.status === 'draft').length,
        avg_seo_score: Math.round(
          allPosts.reduce((acc: number, p: any) => acc + (p.seo_score || 0), 0) / allPosts.length || 0
        ),
        indexed_posts: allPosts.filter((p: any) => p.indexed_by_google).length,
        total_views: allPosts.reduce((acc: number, p: any) => acc + (p.views_count || 0), 0)
      };
      setStats(calculatedStats);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    setFilteredPosts(filtered);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === 'published' && !posts.find(p => p.id === id)?.published_at) {
      updates.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('ai_blog_posts' as any)
      .update(updates)
      .eq('id', id);

    if (error) {
      toast.error('Chyba', {
        description: "Nepodařilo se změnit stav",
      });
    } else {
      toast.success('Úspěch', {
        description: `Článok ${newStatus === 'published' ? 'publikovaný' : 'uložený ako koncept'}`,
      });
      fetchPosts();
      fetchStats();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tento článok?')) return;

    const { error } = await supabase
      .from('ai_blog_posts' as any)
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Chyba', {
        description: "Nepodařilo se smazat článok",
      });
    } else {
      toast.success('Úspěch', {
        description: "Článok bol smazaný",
      });
      fetchPosts();
      fetchStats();
      setSelectedPost(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login-poda-2024");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Koncept</Badge>;
      case 'published':
        return <Badge variant="default" className="bg-green-500">Publikované</Badge>;
      case 'scheduled':
        return <Badge variant="default" className="bg-blue-500">Naplánované</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Blog Manager</h1>
            <p className="text-muted-foreground">Správa AI generovaných článkov</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/ai-blog-test')}>
              <Plus className="h-4 w-4 mr-2" />
              Vytvoriť článok
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Odhlásit se
            </Button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Celkem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_posts || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Publikované</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stats.published || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Koncepty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">{stats.drafts || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">SEO skóre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avg_seo_score || 0}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Indexované</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{stats.indexed_posts || 0}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Články</CardTitle>
            <CardDescription>Seznam všech AI generovaných článkov</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Hledat podle názvu nebo slugu..."
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
                  <SelectItem value="draft">Koncepty</SelectItem>
                  <SelectItem value="published">Publikované</SelectItem>
                  <SelectItem value="scheduled">Naplánované</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchPosts} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Obnoviť
              </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Název</TableHead>
                    <TableHead>Kategorie</TableHead>
                    <TableHead>SEO</TableHead>
                    <TableHead>Zobrazení</TableHead>
                    <TableHead>Stav</TableHead>
                    <TableHead>Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Načítání...
                      </TableCell>
                    </TableRow>
                  ) : filteredPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Žádné články
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(post.created_at).toLocaleDateString('cs-CZ')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{post.title}</div>
                            <div className="text-xs text-muted-foreground">/{post.slug}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className={post.seo_score >= 80 ? "text-green-500" : post.seo_score >= 60 ? "text-yellow-500" : "text-red-500"}>
                              {post.seo_score}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                            {post.views_count}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(post.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPost(post)}
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
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Vytvorené: {selectedPost && new Date(selectedPost.created_at).toLocaleString('cs-CZ')}
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              {selectedPost.header_image_url && (
                <img src={selectedPost.header_image_url} alt={selectedPost.title} className="w-full rounded-lg" />
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Slug</p>
                  <p className="mt-1">/{selectedPost.slug}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Kategorie</p>
                  <p className="mt-1">{selectedPost.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SEO skóre</p>
                  <p className="mt-1">{selectedPost.seo_score}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Zobrazení</p>
                  <p className="mt-1">{selectedPost.views_count}</p>
                </div>
              </div>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Tagy</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Excerpt</p>
                <p className="text-sm">{selectedPost.excerpt}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Obsah</p>
                <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {selectedPost.content}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {selectedPost.status === 'draft' && (
                  <Button onClick={() => handleStatusChange(selectedPost.id, 'published')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Publikovať
                  </Button>
                )}
                {selectedPost.status === 'published' && (
                  <Button variant="outline" onClick={() => handleStatusChange(selectedPost.id, 'draft')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Vrátiť do konceptu
                  </Button>
                )}
                <Button variant="outline" onClick={() => window.open(`https://www.popri.cz/blog/${selectedPost.slug}`, '_blank')}>
                  <Eye className="h-4 w-4 mr-2" />
                  Náhľad na webe
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedPost.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Smazať
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIBlogManager;
