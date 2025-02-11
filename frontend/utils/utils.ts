   export function isValidUrl(input:string): boolean {
     try {
       new URL(input);
       return true;
     } catch (e) {
       return false;
     }
   }
