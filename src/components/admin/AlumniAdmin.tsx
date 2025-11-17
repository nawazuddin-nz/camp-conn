import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

const AlumniAdmin = () => {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduation_year: "",
    company: "",
    role: "",
    linkedin_url: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    const { data } = await supabase
      .from("alumni")
      .select("*")
      .order("graduation_year", { ascending: false });
    setAlumni(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("alumni")
        .update(dataToSubmit)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update alumni");
      } else {
        toast.success("Alumni updated successfully");
      }
    } else {
      const { error } = await supabase
        .from("alumni")
        .insert(dataToSubmit);

      if (error) {
        toast.error("Failed to create alumni");
      } else {
        toast.success("Alumni created successfully");
      }
    }

    setIsOpen(false);
    resetForm();
    fetchAlumni();
  };

  const handleEdit = (alum: any) => {
    setEditingId(alum.id);
    setFormData({
      name: alum.name,
      email: alum.email || "",
      graduation_year: alum.graduation_year?.toString() || "",
      company: alum.company || "",
      role: alum.role || "",
      linkedin_url: alum.linkedin_url || "",
      bio: alum.bio || "",
      avatar_url: alum.avatar_url || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alumni?")) return;

    const { error } = await supabase
      .from("alumni")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete alumni");
    } else {
      toast.success("Alumni deleted successfully");
      fetchAlumni();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      graduation_year: "",
      company: "",
      role: "",
      linkedin_url: "",
      bio: "",
      avatar_url: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Alumni
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Alumni</DialogTitle>
            <DialogDescription>
              {editingId ? "Update" : "Add"} alumni profile information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="graduation_year">Graduation Year</Label>
                <Input
                  id="graduation_year"
                  type="number"
                  value={formData.graduation_year}
                  onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="avatar_url">Avatar URL</Label>
              <Input
                id="avatar_url"
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alumni.map((alum) => (
            <TableRow key={alum.id}>
              <TableCell className="font-medium">{alum.name}</TableCell>
              <TableCell>{alum.company}</TableCell>
              <TableCell>{alum.role}</TableCell>
              <TableCell>{alum.graduation_year}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(alum)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(alum.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlumniAdmin;
