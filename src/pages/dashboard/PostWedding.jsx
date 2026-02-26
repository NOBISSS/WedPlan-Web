

import React from "react"

import { useState } from "react"
import { Upload, ImageIcon, FolderArchive, Sparkles, X, Check, CloudUpload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/DashboardLayout"


export default function PostWeddingPage() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: "ceremony_photos.zip", size: "256 MB", status: "complete", progress: 100 },
    { id: 2, name: "reception_album.zip", size: "189 MB", status: "complete", progress: 100 },
  ])
  const [isDragging, setIsDragging] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    // Simulate file upload
    const newFile = {
      id: Date.now(),
      name: "new_photos.zip",
      size: "125 MB",
      status: "uploading",
      progress: 0,
    }
    setUploadedFiles([...uploadedFiles, newFile])

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id ? { ...f, progress, status: progress >= 100 ? "complete" : "uploading" } : f,
        ),
      )
      if (progress >= 100) clearInterval(interval)
    }, 300)
  }

  const handleFileInput = () => {
    // Simulate file selection
    const newFile = {
      id: Date.now(),
      name: `photos_${Date.now()}.zip`,
      size: "150 MB",
      status: "uploading",
      progress: 0,
    }
    setUploadedFiles([...uploadedFiles, newFile])

    let progress = 0
    const interval = setInterval(() => {
      progress += 15
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id
            ? { ...f, progress: Math.min(progress, 100), status: progress >= 100 ? "complete" : "uploading" }
            : f,
        ),
      )
      if (progress >= 100) clearInterval(interval)
    }, 200)
  }

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId))
  }

  const handleAIExtract = () => {
    setIsExtracting(true)
    setTimeout(() => {
      setIsExtracting(false)
    }, 3000)
  }

  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Post Wedding</h1>
          <p className="text-muted-foreground mt-1">Upload and manage your wedding photos</p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
            <CardDescription>Upload your wedding photos as ZIP files or multiple images</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CloudUpload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Drop your files here</h3>
                <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={handleFileInput}>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Files
                  </Button>
                  <Button variant="outline" onClick={handleFileInput}>
                    <FolderArchive className="h-4 w-4 mr-2" />
                    Upload ZIP
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Supported formats: JPG, PNG, ZIP (max 500MB)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>{uploadedFiles.length} file(s) uploaded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FolderArchive className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-foreground truncate">{file.name}</p>
                        <span className="text-sm text-muted-foreground">{file.size}</span>
                      </div>
                      {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
                      {file.status === "complete" && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          <span>Upload complete</span>
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Photo Extractor */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>AI Photo Extractor</CardTitle>
                <CardDescription>Automatically extract and organize photos by person</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI will analyze your photos and automatically group them by people, making it easy to share specific
              photos with each guest.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAIExtract} disabled={isExtracting || uploadedFiles.length === 0}>
                {isExtracting ? (
                  <>
                    <span className="animate-pulse">Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start AI Extraction
                  </>
                )}
              </Button>
            </div>

            {isExtracting && (
              <div className="mt-4 p-4 bg-card rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                  <span className="text-foreground font-medium">Analyzing photos...</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">Detecting faces and grouping by person</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gallery Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Gallery Preview
            </CardTitle>
            <CardDescription>Preview of your uploaded wedding photos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-muted overflow-hidden">
                  <img
                    src={`/wedding-photo-.jpg?height=200&width=200&query=wedding photo ${i}`}
                    alt={`Wedding photo ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 bg-transparent">
              View All Photos
            </Button>
          </CardContent>
        </Card>
      </div>
  )
}
