import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Premium plugins - uncomment if you have them installed
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { SplitText } from "gsap/SplitText";

// For this implementation, we will use a mock/shim for SplitText/ScrollSmoother 
// if they are not available to prevent runtime errors during development 
// without the Club GSAP token. 

export const registerGsapPlugins = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);
    
    // Check if premium plugins are available in global scope or imported
    // try {
    //   gsap.registerPlugin(ScrollSmoother, SplitText);
    // } catch (e) {
    //   console.warn("GSAP Premium plugins not found");
    // }
  }
};

export default gsap;
