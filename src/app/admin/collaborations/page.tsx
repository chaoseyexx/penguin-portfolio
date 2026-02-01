"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, GripVertical, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Collaboration { id: string; name: string; image: string; creator: string; role: string; memberCount: string }

function SortableCollaboration({ collab, onEdit, onDelete }: { collab: Collaboration; onEdit: () => void; onDelete: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: collab.id })
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

    return (
        <Card ref={setNodeRef} style={style} className="bg-neutral-900/50 border-neutral-800/50 group">
            <CardContent className="p-3">
                <div className="flex items-center gap-3">
                    <div {...attributes} {...listeners} className="p-1 cursor-grab active:cursor-grabbing text-neutral-500 hover:text-neutral-300">
                        <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={collab.image} alt={collab.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=?" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-white truncate">{collab.name}</h3>
                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost" onClick={onEdit} className="h-6 w-6 p-0 text-neutral-400 hover:text-white"><Pencil className="h-3 w-3" /></Button>
                                <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0 text-neutral-400 hover:text-red-400"><Trash2 className="h-3 w-3" /></Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <p className="text-[10px] text-neutral-400 truncate">By {collab.creator || "Unknown"}</p>
                            <div className="flex gap-2">
                                <span className="text-[10px] text-neutral-500">{collab.memberCount || "0"} Members</span>
                                <span className="text-[10px] text-neutral-500">{collab.role || "Member"} Rank</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function CollaborationsPage() {
    const [collaborations, setCollaborations] = useState<Collaboration[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [editingCollab, setEditingCollab] = useState<Collaboration | null>(null)
    const [deletingCollab, setDeletingCollab] = useState<Collaboration | null>(null)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({ name: "", image: "", creator: "", role: "", memberCount: "" })

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    useEffect(() => { fetchCollaborations() }, [])

    const fetchCollaborations = async () => {
        try {
            const res = await fetch("/api/collaborations")
            const data = await res.json()
            setCollaborations(Array.isArray(data) ? data : [])
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = collaborations.findIndex(c => c.id === active.id)
        const newIndex = collaborations.findIndex(c => c.id === over.id)
        const newCollaborations = arrayMove(collaborations, oldIndex, newIndex)
        setCollaborations(newCollaborations)
        try {
            await fetch("/api/collaborations", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: newCollaborations }) })
        } catch (e) { console.error(e) }
    }

    const handleAdd = () => { setEditingCollab(null); setFormData({ name: "", image: "", creator: "", role: "", memberCount: "" }); setIsFormOpen(true) }
    const handleEdit = (c: Collaboration) => { setEditingCollab(c); setFormData({ name: c.name, image: c.image, creator: c.creator, role: c.role, memberCount: c.memberCount }); setIsFormOpen(true) }
    const handleDelete = (c: Collaboration) => { setDeletingCollab(c); setIsDeleteOpen(true) }

    const handleSave = async () => {
        setSaving(true)
        try {
            const method = "POST" // My API uses POST for create/update single item
            const body = editingCollab ? { ...formData, id: editingCollab.id } : formData
            const res = await fetch("/api/collaborations", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
            if (res.ok) { await fetchCollaborations(); setIsFormOpen(false) }
        } catch (e) { console.error(e) } finally { setSaving(false) }
    }

    const confirmDelete = async () => {
        if (!deletingCollab) return
        try {
            const res = await fetch(`/api/collaborations?id=${deletingCollab.id}`, { method: "DELETE" })
            if (res.ok) { await fetchCollaborations(); setIsDeleteOpen(false); setDeletingCollab(null) }
        } catch (e) { console.error(e) }
    }

    if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-2 border-rose-500 border-t-transparent"></div></div>

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Collaborations</h1>
                    <p className="text-xs text-neutral-400">Manage groups you've worked with</p>
                </div>
                <Button size="sm" onClick={handleAdd} className="bg-gradient-to-r from-rose-600 to-red-600"><Plus className="h-3 w-3 mr-1" /> Add</Button>
            </div>

            {/* Drag and drop disabled for now until API supports reorder via PUT */}
            {/* <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={collaborations.map(c => c.id)} strategy={verticalListSortingStrategy}> */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {collaborations.map((collab) => <SortableCollaboration key={collab.id} collab={collab} onEdit={() => handleEdit(collab)} onDelete={() => handleDelete(collab)} />)}
            </div>
            {/* </SortableContext>
            </DndContext> */}

            {collaborations.length === 0 && <div className="text-center py-8"><p className="text-neutral-400 text-sm">No collaborations yet</p><Button onClick={handleAdd} variant="link" className="text-rose-400 text-sm">Add your first one</Button></div>}

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base">{editingCollab ? "Edit Collaboration" : "Add Collaboration"}</DialogTitle>
                        <DialogDescription className="text-neutral-400 text-sm">Add a group or YouTuber you've collaborated with.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2"><label className="text-[10px] text-neutral-400 block mb-1">Group Name</label><Input value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="bg-neutral-800 border-neutral-700 h-8 text-sm" placeholder="e.g. Combat Assault Team" /></div>
                            <div className="col-span-2"><label className="text-[10px] text-neutral-400 block mb-1">Image URL</label><Input value={formData.image} onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))} className="bg-neutral-800 border-neutral-700 h-8 text-sm" placeholder="https://..." /></div>
                            <div><label className="text-[10px] text-neutral-400 block mb-1">Creator</label><Input value={formData.creator} onChange={(e) => setFormData(p => ({ ...p, creator: e.target.value }))} className="bg-neutral-800 border-neutral-700 h-8 text-sm" placeholder="e.g. Joshuaholic" /></div>
                            <div><label className="text-[10px] text-neutral-400 block mb-1">Member Count</label><Input value={formData.memberCount} onChange={(e) => setFormData(p => ({ ...p, memberCount: e.target.value }))} className="bg-neutral-800 border-neutral-700 h-8 text-sm" placeholder="e.g. 26K+" /></div>
                            <div className="col-span-2"><label className="text-[10px] text-neutral-400 block mb-1">My Rank/Role</label><Input value={formData.role} onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))} className="bg-neutral-800 border-neutral-700 h-8 text-sm" placeholder="e.g. Recruit" /></div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button size="sm" variant="outline" onClick={() => setIsFormOpen(false)} className="border-neutral-700">Cancel</Button>
                        <Button size="sm" onClick={handleSave} disabled={saving || !formData.name || !formData.image} className="bg-gradient-to-r from-rose-600 to-red-600">{saving ? "..." : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent className="bg-neutral-900 border-neutral-800">
                    <AlertDialogHeader><AlertDialogTitle className="text-white text-base">Delete Collaboration</AlertDialogTitle><AlertDialogDescription className="text-neutral-400 text-sm">Delete "{deletingCollab?.name}"?</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel className="border-neutral-700 text-white hover:bg-neutral-800 h-8 text-sm">Cancel</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 h-8 text-sm">Delete</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
