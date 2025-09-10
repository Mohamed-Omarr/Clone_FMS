"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useOutletContext } from "react-router-dom";
import type { User } from "@/types";

export default function PatientManagement() {
  // single user from router context
  const user = useOutletContext<User>();

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
  });

  // flatten patients from this single user
  const allPatients = user.Patient.map((p) => ({
    therapistId: user.id,
    therapistName: user.Name,
    ...p, // spreads Name, Age, Contact, LastAssessment, FMSScore, Status
  }));

  const filteredPatients = allPatients.filter((patient) => {
    const matchesSearch =
      patient.Name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      patient.Contact.email.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      patient.Status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New patient data:", formData);
    setIsDialogOpen(false);
    setFormData({ fullName: "", age: "", email: "", phone: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-full p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Patient Management</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Patient</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Add Patient
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-4 items-center mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search patients..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Patients Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Patient</th>
                  <th className="text-left p-4 font-medium">Age</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Therapist</th>
                  <th className="text-left p-4 font-medium">Last Assessment</th>
                  <th className="text-left p-4 font-medium">FMS Score</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-4 font-medium">{patient.Name}</td>
                    <td className="p-4 text-muted-foreground">{patient.Age}</td>
                    <td className="p-4 text-muted-foreground">
                      {patient.Contact.email} / {patient.Contact.phone}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {patient.therapistName}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(patient.LastAssessment).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium">{patient.FMSScore}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(patient.Status)}>
                        {patient.Status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
