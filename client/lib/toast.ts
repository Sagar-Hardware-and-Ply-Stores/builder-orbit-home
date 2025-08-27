// Professional toast notification utility

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function showToast(message: string, options: ToastOptions = {}) {
  const {
    type = 'success',
    duration = 3000,
    position = 'top-right'
  } = options;

  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.professional-toast');
  existingToasts.forEach(toast => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  });

  const toast = document.createElement('div');
  toast.className = `professional-toast fixed z-50 transform transition-all duration-300 ease-in-out`;
  
  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  // Type-specific styling
  const typeStyles = {
    success: {
      bg: 'bg-green-500',
      icon: `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>`,
      border: 'border-green-400'
    },
    error: {
      bg: 'bg-red-500',
      icon: `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>`,
      border: 'border-red-400'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>`,
      border: 'border-yellow-400'
    },
    info: {
      bg: 'bg-blue-500',
      icon: `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`,
      border: 'border-blue-400'
    }
  };

  const style = typeStyles[type];
  
  toast.className += ` ${positionClasses[position]}`;
  toast.innerHTML = `
    <div class="flex items-center space-x-3 ${style.bg} text-white px-6 py-4 rounded-xl shadow-lg border-l-4 ${style.border} backdrop-blur-sm">
      <div class="flex-shrink-0">
        ${style.icon}
      </div>
      <div class="flex-1">
        <p class="font-medium text-sm">${message}</p>
      </div>
      <button class="flex-shrink-0 ml-4 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors" onclick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;

  // Initial state (slide in from the right)
  toast.style.transform = 'translateX(100%)';
  document.body.appendChild(toast);

  // Trigger slide-in animation
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  // Auto-remove after duration
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }
  }, duration);
}

// Convenience methods
export const toast = {
  success: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'success' }),
  
  error: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'error' }),
  
  warning: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'warning' }),
  
  info: (message: string, options?: Omit<ToastOptions, 'type'>) => 
    showToast(message, { ...options, type: 'info' }),
};
