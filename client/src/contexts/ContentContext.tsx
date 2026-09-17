import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loadSiteContent } from "../lib/sanity";
import { fallbackContent, type SiteContent } from "../lib/siteContent";

const ContentContext = createContext<SiteContent>(fallbackContent);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(fallbackContent);
  useEffect(() => {
    let active = true;
    loadSiteContent()
      .then(next => active && setContent(next))
      .catch(error => {
        console.error(
          "No se pudo cargar Sanity; se muestra el contenido local de respaldo.",
          error
        );
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
