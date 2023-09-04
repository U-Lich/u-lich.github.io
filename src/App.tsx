import Converter from "./components/converter/Converter";
import InfoBlock from "./components/info/InfoBlock";
import TitleBlock from "./components/intro/TitleBlock";

function App() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <TitleBlock />
      <Converter />
      <InfoBlock />
    </div>
  );
}

export default App;
