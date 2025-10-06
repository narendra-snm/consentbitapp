import ScriptCard from "./ScriptCard";
import PanelRow from "./PannelRow";
import line from "../assets/line.svg";
import scriptTick from "../assets/script-tick.svg";
import edit from "../assets/editIcon.svg";
import explainationMark from "../assets/info.svg";
const categories = [
  { label: "Essential" },
  { label: "Personalization" },
  { label: "Analytics" },
  { label: "Marketing" },
];

const dummyScripts = [
  "<script>\nconsole.log('Script 1 Loaded');\n</script>",
  "<script>\nconsole.log('Script 2 Loaded');\n</script>",
  "<script>\nconsole.log('Script 3 Loaded');\n</script>",
];

type ScriptData = {
  script: string;
  isChanged: boolean;




  isDismiss: boolean;
  isSaved?: boolean;
  isEditing?: boolean;
   category: string[];
};
const saveScripts = async (scripts: ScriptData[],siteId: string) => {
    try {
      const response = await fetch("https://framer-consentbit.web-8fb.workers.dev/scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, scripts }),
      });

     if (response.ok) {
  console.log("Scripts saved to KV!");
} else {
  console.error("Failed to save scripts");
}
    } catch (err) {
      console.error("Error saving scripts:", err);
    }
  };

function Dismiss({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fbp-card dismissed-card">
      <div className="dismissed-message">
        <p>
          <span>Custom</span> Script is Dismissed!
        </p>
        <button className="fbp-dismiss" onClick={onDismiss}>
          {" "}
          <img
            src="https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/fd0a8c224e96a3c81042.svg"
            alt="activate icon"
            style={{ marginRight: "5px" }}
          />
          Activate
        </button>
      </div>
    </div>
  );
}

function Info() {

  return (
   <div className="fbp-card info-card2">
      <img src={explainationMark} alt="Info" className="fbp-info-top-icon fbp-info" />

      <p>
Scan your project for any scripts that set cookies.</p>
<p>Organize and replace them using our recommended snippet, and refer to our tutorial for a streamlined setup.</p>
    <p>Need help? See the docs uparrow</p>
    </div>
  );
}




const SavedComponent = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <div className="fbp-card dismissed-card" role="group" aria-label="Saved status">
      <div className="saved-row">
        <div className="" aria-hidden="true">
          {/* check icon */}
          <img src={scriptTick} alt="Saved" className="status-icon" />
        </div>

        <div className="saved-content">
          <h3 className="saved-title">Custom is implemented correctly.</h3>
          <div className="saved-sub">
            <span>Categories:</span>
            <strong>Personalization</strong>
             <div  className="saved-actions">
          <button className="edit" title="Edit" onClick={onEdit}>
           <img src={edit} alt="Edit" className="edit-icon"/>
            Edit
          </button>
        </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default function ScreenThird({isPanel=false,siteId,setScripts,scripts,onClick}: {isPanel?: boolean, siteId: string, setScripts: React.Dispatch<React.SetStateAction<ScriptData[]>>, scripts: ScriptData[],onClick?: () => void}) {
  // const [scripts, setScripts] = useState<ScriptData[]>(
  //   dummyScripts.map((script) => ({
  //     script,
  //     isChanged: false,
  //     isSaved: false,
  //     isEditing: true,
  //     isDismiss: false,
  //     category: null,
  //   }))
  // );

 const handleCategoryChange = (idx: number, newCategory: string) => {
  console.log(`Category changed for script index ${idx}:`, newCategory);
  setScripts((arr) =>
    arr.map((s, i) =>
      i === idx
        ? {
            ...s,
            // Toggle category selection
            category: s.category.includes(newCategory)
              ? s.category.filter((cat) => cat !== newCategory)
              : [...s.category, newCategory],
            isChanged: true,
          }
        : s
    )
  );
};

  const handleDismiss = (idx: number) => {
    setScripts((arr) =>
      arr.map((s, i) => (i === idx ? { ...s, isDismiss: true } : s))
    );
  };
  const handleActivate = (idx: number) => {
    setScripts((arr) =>
      arr.map((s, i) => (i === idx ? { ...s, isDismiss: false } : s))
    );
  };
  const handleCopyScript = (idx: number) => {
    const s = scripts[idx];
    const attr = [
      s.category ? ` data-category="${s.category}"` : "",
      ` isChanged="${s.isChanged}"`,
      ` isDismiss="${s.isDismiss}"`,
    ].join("");
    const injected = s.script.replace("<script", `<script${attr}`);
    navigator.clipboard.writeText(injected);
  };

  const getScriptTagData = (s: ScriptData) => {
  const attr = [
   s.isChanged ? ` type="text/plain"` : "", s.category && s.category.length > 0
      ? ` data-category="${s.category.join(',')}"`
      : "",
  ].join("");
  return s.script.replace("<script", `<script${attr}`);
};

  async function handleSaveAll() {

    await saveScripts(scripts,siteId);
   
    setScripts((arr) =>
      arr.map((s) => ({
        ...s,
        isEditing: false,
        isSaved: s.isChanged,
      }))
    );
  }

  function handleEdit(idx: number) {
    console.log("Editing script at index:", idx);
    setScripts((arr) =>
      arr.map((s, i) => (i === idx ? { ...s, isEditing: true } : s))
    );
  }
  console.log("Scripts State:", scripts);

  return (
    <div className="main">

     {isPanel && <PanelRow isblurred={false} />}

     { isPanel && <div className="script-heading">
        <h3 className="script-title">List of scripts to update</h3>
        <button className="script-next" onClick={onClick}>Next</button>
      </div>}


      {!isPanel && <Info />}
      <img src={line} className="line" />
      <div className="script-submit">
        <button className="script-next" onClick={handleSaveAll}>
          Save Categories
        </button>
      </div>
      <div
      style={{ width: "100%",  }}
      >
        {scripts.map((scriptObj, idx) => {
          if (scriptObj.isDismiss) {
            return (
              <div key={idx} style={{ flex: 1 }}>
                <Dismiss onDismiss={() => handleActivate(idx)} />
              </div>
            );
          }

          if (scriptObj.isSaved && !scriptObj.isEditing) {
            return (
              <div key={idx} style={{ flex: 1 }}>
                <SavedComponent  onEdit={() => handleEdit(idx)}/>
              </div>
            );
          }

          return (
            <div key={idx} style={{ flex: 1 }}>
              <ScriptCard
                script={getScriptTagData(scriptObj)}
                categories={categories}
                initialCategory={scriptObj.category}
                onCategoryChange={(newCategory) =>
                  handleCategoryChange(idx, newCategory)
                }
                onCopyScript={() => handleCopyScript(idx)}
                pasteLink="#"
                pasteLinkText="Open the page to paste script"
                onDismiss={() => handleDismiss(idx)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
