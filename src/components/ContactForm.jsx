import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEnvelope, FaUser, FaPhone, FaComment, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const FORM_TYPES = {
  CONTACT: 'contact',
  QUOTE: 'quote',
  SUPPORT: 'support'
};

export default function ContactForm({ type = FORM_TYPES.CONTACT, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    productInterest: '',
    budget: '',
    urgency: 'medium'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Email inválido' : '';
      case 'phone':
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
        return !phoneRegex.test(value) ? 'Teléfono inválido' : '';
      case 'message':
        return value.length < 10 ? 'El mensaje debe tener al menos 10 caracteres' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'message'];
    
    if (type === FORM_TYPES.QUOTE) {
      requiredFields.push('phone');
    }

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es requerido';
      } else {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, type })
      // });

      console.log('Form submitted:', { ...formData, type });
      
      setIsSubmitted(true);
      onSuccess && onSuccess(formData);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          productInterest: '',
          budget: '',
          urgency: 'medium'
        });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      onError && onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-green-900 border border-green-700 rounded-lg p-6 text-center">
        <FaCheck className="mx-auto text-3xl text-green-400 mb-4" />
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-green-200">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  const getFormTitle = () => {
    switch (type) {
      case FORM_TYPES.QUOTE: return 'Solicitar Cotización';
      case FORM_TYPES.SUPPORT: return 'Soporte Técnico';
      default: return 'Contactanos';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">{getFormTitle()}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                <FaUser className="inline mr-2" />
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-base ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Tu nombre completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <FaExclamationTriangle className="mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                <FaEnvelope className="inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-base ${errors.email ? 'border-red-500' : ''}`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                  <FaExclamationTriangle className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone (required for quotes) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              <FaPhone className="inline mr-2" />
              Teléfono {type === FORM_TYPES.QUOTE && '*'}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-base ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="+54 11 2233-4455"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <FaExclamationTriangle className="mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Asunto
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input-base"
            >
              <option value="">Selecciona un tema</option>
              <option value="product-info">Información de Productos</option>
              <option value="quote">Cotización</option>
              <option value="support">Soporte Técnico</option>
              <option value="warranty">Garantía</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Product Interest (for quotes) */}
          {type === FORM_TYPES.QUOTE && (
            <div>
              <label htmlFor="productInterest" className="block text-sm font-medium mb-2">
                Producto de Interés
              </label>
              <select
                id="productInterest"
                name="productInterest"
                value={formData.productInterest}
                onChange={handleChange}
                className="input-base"
              >
                <option value="">Selecciona un producto</option>
                <option value="elite-pro">ProGrip Elite Pro</option>
                <option value="classic">AeroGlove Classic</option>
                <option value="junior">GripMaster Junior</option>
                <option value="multiple">Varios productos</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              <FaComment className="inline mr-2" />
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              className={`input-base resize-none ${errors.message ? 'border-red-500' : ''}`}
              placeholder="Cuéntanos en qué podemos ayudarte..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <FaExclamationTriangle className="mr-1" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Enviando...
              </span>
            ) : (
              'Enviar Mensaje'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

ContactForm.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

ContactForm.defaultProps = {
  type: FORM_TYPES.CONTACT,
  onSuccess: null,
  onError: null
};

export { FORM_TYPES };