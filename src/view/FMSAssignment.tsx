"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import type { User } from "@/types";

export default function FMSAssignment() {
  // Get single user from router context
  const user = useOutletContext<User>();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [therapistFilter, setTherapistFilter] = useState("all");

  // Build assessments data from patient's Assessment object
  const assessmentsData =
    user?.Patient?.map((patient, index) => ({
      id: index.toString(),
      date: patient.Assessment.Date,
      patient: patient.Name,
      fmsScore: patient.Assessment.FMSScore,
      duration: patient.Assessment.Duration,
      status: patient.Assessment.Status,
      therapist: patient.Assessment.Therapist,
    })) ?? [];

  // Summary stats
  const totalAssessments = assessmentsData.length;
  const completedAssessments = assessmentsData.filter(
    (a) => a.status === "completed"
  ).length;
  const averageScore =
    totalAssessments > 0
      ? Math.round(
          assessmentsData.reduce((sum, a) => sum + a.fmsScore, 0) /
            totalAssessments
        )
      : 0;

  // Apply filters
  const filteredAssessments = assessmentsData.filter((assessment) => {
    const matchesSearch =
      assessment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.therapist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || assessment.status === statusFilter;
    const matchesTherapist =
      therapistFilter === "all" || assessment.therapist === therapistFilter;

    return matchesSearch && matchesStatus && matchesTherapist;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFMSScoreColor = (score: number) => {
    if (score >= 18) return "text-green-600 font-semibold";
    if (score >= 15) return "text-blue-600 font-semibold";
    if (score >= 12) return "text-orange-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FMS Assessments</h1>
          <p className="text-gray-600 mt-1">
            Manage and review functional movement assessments
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          New Assessment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Total Assessments</p>
          <p className="text-2xl font-bold text-gray-900">{totalAssessments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {completedAssessments}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-bold text-blue-600">{averageScore}/21</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by patient or therapist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={therapistFilter} onValueChange={setTherapistFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by therapist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Therapists</SelectItem>
            <SelectItem value={user.Name}>{user.Name}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assessments Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>FMS Score</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Therapist</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell className="font-medium">
                  {new Date(assessment.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{assessment.patient}</TableCell>
                <TableCell>
                  <span className={getFMSScoreColor(assessment.fmsScore)}>
                    {assessment.fmsScore}/21
                  </span>
                </TableCell>
                <TableCell>{assessment.duration}</TableCell>
                <TableCell>{getStatusBadge(assessment.status)}</TableCell>
                <TableCell>{assessment.therapist}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredAssessments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No assessments found matching your criteria.
        </div>
      )}
    </div>
  );
}
