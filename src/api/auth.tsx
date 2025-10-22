
const backend_url = 'http://localhost:8000';
export const loginApi = async (email: string, password: string) => {
  try {
    const response = await fetch(`${backend_url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Extract error message from backend
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    // Success: parse JSON
    const data = await response.json();
    return data; // { token: "...", user: {...} }
  } catch (error) {
   
    throw error;
  }
};

export const ResetPassword = async (email: string) =>{
 try {
    const response = await fetch(`${backend_url}/api/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email}),
    });

    if (!response.ok) {
      // Extract error message from backend
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    // Success: parse JSON
    const data = await response.json();
    return data; // { token: "...", user: {...} }
  } catch (error) {
   
    throw error;
  } 
}

export const setNewPassword = async (token: string, password: string) =>{

   try {
    const response = await fetch(`${backend_url}/api/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({token, password}),
    });

    if (!response.ok) {
      // Extract error message from backend
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    // Success: parse JSON
    const data = await response.json();
    return data; // { token: "...", user: {...} }
  } catch (error) {
   
    throw error;
  } 


}


export const getUserDetails = async () => {
  
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get User failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }

}

export const updateProfile = async (name: string, email: string) => {

  try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, email}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }

    const data = await response.json();
    return data; // { token: "...", user: {...} }

    } catch (err: any) {
      throw err;
    }
}

export const updatePassword = async (current_password: string, password: string) =>{
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({current_password, password}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }

    const data = await response.json();
    return data; // { token: "...", user: {...} }

    } catch (err: any) {
      throw err;
    }
}

export const allUsers = async () => {
      try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get Users failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const CreateUser = async (name: any, email: any, password='', oto1:any, oto2 :any, oto3:any, oto4:any, oto5:any, oto6:any, oto7:any, oto8:any,) =>{
try {
     const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/create-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, email, password, oto1, oto2 , oto3, oto4, oto5, oto6, oto7, oto8}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Create User failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const editUser = async (id: string) => {
      try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/edituser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get Users failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const updateUser = async (id:any, name:any, email:any, oto1:any, oto2 :any, oto3:any, oto4:any, oto5:any, oto6:any, oto7:any, oto8:any, password=null) => {
      try {
     const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/update-user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, email, oto1, oto2 , oto3, oto4, oto5, oto6, oto7, oto8, password}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update User failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const deleteUser = async (id: any) =>{
try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Delete Users failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}


export const getAgency = async () => {
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/agency`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get Users failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const CreateAgency = async (name: any, email: any, password='', oto1:any,) => {
 try {
     const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/add-agency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, email, password, oto1}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Create User failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    } 
}

export const editAgency = async (id: string) => {
      try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/agency/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get Users failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const updateAgency = async (id:any, name:any, email:any, oto1:any, password=null) => {
      try {
     const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/update-agency/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, email, oto1, password}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update User failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const deleteAgency = async (id: any) =>{
try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/delete-agency/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Delete Users failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}


export const publishWeb = async (htmlcode: string, csscode: string, jscode: string, title: string, prompt: string) => {
     try {
     const token = localStorage.getItem("token");
      const response = await fetch(`${backend_url}/api/publish-website`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({htmlcode, csscode, jscode, title, prompt}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Publish failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const getPublishWeb = async () => {
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/all-website`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Get Website failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const deleteWebPage = async (id: any) => {
  
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/delete-website/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Delete Website failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const editProject = async (slug: any) =>{
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/edit-project/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Edit Project failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}

export const editWebsite = async (htmlcode: string, csscode: string, jscode: string, title: string, prompt: string) =>{
    try {
     const token = localStorage.getItem("token"); 
      const response = await fetch(`${backend_url}/api/edit-website`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify({htmlcode, csscode, jscode, title, prompt}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Edit Project failed");
      }

    const data = await response.json();
    return data; 

    } catch (err: any) {
      throw err;
    }
}






