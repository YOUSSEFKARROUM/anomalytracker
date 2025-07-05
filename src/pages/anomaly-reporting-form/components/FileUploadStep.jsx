import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FileUploadStep = ({ formData, setFormData, currentLanguage = 'fr' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const translations = {
    fr: {
      title: 'Fichiers et preuves',
      subtitle: 'Ajoutez des photos ou documents pour illustrer le problème (optionnel)',
      dragDrop: 'Glissez-déposez vos fichiers ici',
      or: 'ou',
      browse: 'Parcourir les fichiers',
      supportedFormats: 'Formats supportés: JPG, PNG, PDF, DOC (Max 10MB par fichier)',
      maxFiles: 'Maximum 5 fichiers',
      fileName: 'Nom du fichier',
      fileSize: 'Taille',
      remove: 'Supprimer',
      uploading: 'Téléchargement...',
      uploadComplete: 'Téléchargé',
      noFiles: 'Aucun fichier sélectionné',
      addFiles: 'Ajouter des fichiers',
      preview: 'Aperçu'
    },
    ar: {
      title: 'الملفات والأدلة',
      subtitle: 'أضف صور أو مستندات لتوضيح المشكلة (اختياري)',
      dragDrop: 'اسحب وأفلت ملفاتك هنا',
      or: 'أو',
      browse: 'تصفح الملفات',
      supportedFormats: 'الصيغ المدعومة: JPG, PNG, PDF, DOC (حد أقصى 10 ميجابايت لكل ملف)',
      maxFiles: 'حد أقصى 5 ملفات',
      fileName: 'اسم الملف',
      fileSize: 'الحجم',
      remove: 'حذف',
      uploading: 'جاري الرفع...',
      uploadComplete: 'تم الرفع',
      noFiles: 'لم يتم اختيار ملفات',
      addFiles: 'إضافة ملفات',
      preview: 'معاينة'
    }
  };

  const t = translations[currentLanguage];

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 5;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const currentFiles = formData.files || [];
    const newFiles = [];

    Array.from(files).forEach((file) => {
      // Check file count
      if (currentFiles.length + newFiles.length >= maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Check file size
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`);
        return;
      }

      // Create file object with preview
      const fileObj = {
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: null
      };

      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fileObj.preview = e.target.result;
          setFormData(prev => ({
            ...prev,
            files: [...(prev.files || []), fileObj]
          }));
        };
        reader.readAsDataURL(file);
      } else {
        newFiles.push(fileObj);
      }
    });

    if (newFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        files: [...(prev.files || []), ...newFiles]
      }));
    }
  };

  const removeFile = (fileId) => {
    setFormData(prev => ({
      ...prev,
      files: (prev.files || []).filter(file => file.id !== fileId)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'FileText';
    if (fileType.includes('word')) return 'FileText';
    return 'File';
  };

  const currentFiles = formData.files || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          {t.title}
        </h2>
        <p className="text-text-secondary">
          {t.subtitle}
        </p>
      </div>

      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300 hover:bg-surface'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
          </div>
          
          <div>
            <p className="text-lg font-medium text-text-primary mb-2">
              {t.dragDrop}
            </p>
            <p className="text-text-secondary mb-4">
              {t.or}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              <Icon name="FolderOpen" size={20} />
              <span>{t.browse}</span>
            </button>
          </div>
          
          <div className="text-xs text-text-secondary space-y-1">
            <p>{t.supportedFormats}</p>
            <p>{t.maxFiles}</p>
          </div>
        </div>
      </div>

      {/* File List */}
      {currentFiles.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {t.preview} ({currentFiles.length}/{maxFiles})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFiles.map((fileObj) => (
              <div
                key={fileObj.id}
                className="border border-border rounded-lg p-4 bg-background hover:shadow-card-hover transition-shadow duration-200"
              >
                <div className="flex items-start space-x-3">
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0">
                    {fileObj.preview ? (
                      <Image
                        src={fileObj.preview}
                        alt={fileObj.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-surface rounded flex items-center justify-center">
                        <Icon name={getFileIcon(fileObj.type)} size={24} className="text-text-secondary" />
                      </div>
                    )}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {fileObj.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatFileSize(fileObj.size)}
                    </p>
                    
                    {/* Upload Progress (Mock) */}
                    {uploadProgress[fileObj.id] ? (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-surface rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[fileObj.id]}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-secondary">
                            {uploadProgress[fileObj.id]}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="CheckCircle" size={12} className="text-success" />
                        <span className="text-xs text-success">{t.uploadComplete}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(fileObj.id)}
                    className="flex-shrink-0 p-1 text-text-secondary hover:text-error transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">{t.noFiles}</p>
        </div>
      )}

      {/* Add More Files Button */}
      {currentFiles.length > 0 && currentFiles.length < maxFiles && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors duration-200"
          >
            <Icon name="Plus" size={16} />
            <span>{t.addFiles}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadStep;