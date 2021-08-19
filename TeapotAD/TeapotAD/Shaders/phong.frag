#version 430


in vec3 vertPos;
in vec3 N;
in vec3 lightPos;
in vec3 camPos;


uniform mat4 V;
/*TODO:: Complete your shader code for a full Phong shading*/ 
uniform vec3 Ka; 
uniform vec3 Kd;       // Diffuse reflectivity
uniform vec3 Ks; 
uniform vec3 La;
uniform vec3 Ld;            // Diffuse light intensity
uniform vec3 Ls;

vec3 campos= normalize(camPos);


// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

void main() {

   //Calculate the light vector
   vec3 L = normalize(lightPos - vertPos);  //What is this code doing?
    
	vec3 Ambient =La*Ka;
	


   //calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1  
   vec4 Id = vec4(Ld,1.0) * max(dot(N,L), 0.0);// Why do we need vec4(vec3)?
   Id = clamp(Id, 0.0, 1.0); // What is the role of clamp function? Why do we need it? 

   vec3 R=2*N*dot(N,-L)+L;



   vec3 specular=Ks*clamp(Ls*pow(dot(R,campos),20),0.0,1.0);


   //Multiply the Reflectivity by the Diffuse intensity
   FragColour =vec4(specular+Ambient,0.0)+ vec4(Kd,1.0) * Id;
   //FragColour =vec4(Ambient,1.0);
   //FragColour =vec4(Kd,1.0) * Id;
   //FragColour =vec4(specular,1.0);



}
