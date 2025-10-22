// AI Generation Service

export class AIService {
  private static instance: AIService;
  private apiKey: string;

  private constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateProject(prompt: string, type: any, html:any, css:any, js:any, onStream?: (chunk: string) => void): Promise<{
    result: any[];
  }> {
      try {
    const backend_url = 'http://localhost:8000';
     const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/claude-api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({prompt, type, html, css, js}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "failed to Generate");
      }


        // Simulate streaming response
    const steps = [
      'Analyzing your prompt...',
      'Generating HTML structure...',
      'Creating responsive CSS...',
      'Adding JavaScript functionality...',
      'Optimizing for performance...',
      'Finalizing components...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (onStream) {
        onStream(steps[i]);
      }
    }
    const selectedTemplate = await response.json();
    return selectedTemplate; 

    } catch (err: any) {
      throw err;
    }

  }



  



  async explainCode(code: string): Promise<string> {
    // Simulate AI code explanation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `This code creates a modern, responsive website with the following features:

🏗️ **Structure**: Clean HTML5 semantic structure with navigation, hero section, content areas, and footer.

🎨 **Styling**: Modern CSS with:
- Gradient backgrounds and glass-morphism effects
- Responsive grid layouts that adapt to all screen sizes
- Smooth animations and hover effects
- Mobile-first design approach

⚡ **Functionality**: Interactive JavaScript including:
- Smooth scrolling navigation
- Dynamic content loading
- Form handling with validation
- Shopping cart functionality (for e-commerce)
- Responsive mobile menu

🚀 **Performance**: Optimized for fast loading with efficient CSS and minimal JavaScript footprint.

The code follows modern web standards and best practices for accessibility, SEO, and user experience.`;
  }

  async generateFromVoice(transcript: string): Promise<string> {
    // Process voice input and convert to structured prompt
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const voicePrompts = {
      'make navbar red': 'Update the navigation bar background color to red',
      'add contact form': 'Add a contact form with name, email, and message fields',
      'change hero text': 'Modify the hero section headline and description',
      'add pricing table': 'Insert a pricing table with multiple plan options'
    };

    return voicePrompts[transcript.toLowerCase()] || `Convert voice command: "${transcript}" into website modification`;
  }
}

export const aiService = AIService.getInstance();