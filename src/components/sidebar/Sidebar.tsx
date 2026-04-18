import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  collapsed?: boolean;
  sections?: Array<{
    id: string;
    title: string;
    subsections?: Array<{ id: string; title: string }>;
  }>;
  onSectionChange?: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed = false, 
  sections = [],
  onSectionChange 
}) => {
  return (
    <aside className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>Documentation</h3>
      </div>
      
      <div className="sidebar-divider"></div>
      
      {/* Directly map sections – no extra wrapper */}
      {sections.map((section) => (
        <div key={section.id} className="sidebar-section">
          <h4>{section.title}</h4>
          {section.subsections && (
            <div className="subsection-list">
              {section.subsections.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  className="subsection-item"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSectionChange) {
                      onSectionChange(section.id);
                    }
                    setTimeout(() => {
                      document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  {sub.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="sidebar-footer">
        <div className="user-stats"></div>
      </div>
    </aside>
  );
};

export default Sidebar;