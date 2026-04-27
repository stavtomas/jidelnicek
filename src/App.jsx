import React, { useMemo, useState } from "react";
import "./App.css";

const people = ["Tomáš", "Terka"];
const mealTypes = ["Snídaně", "Potréninková suplementace", "Hlavní jídlo"];

const foods = {
  sides: [
    { name: "Rýže" },
    { name: "Rýžové nudle" },
    { name: "Rýžové chlebíčky" },
    { name: "Těstoviny" },
    { name: "Rýžová kaše" },
    { name: "Brambory", multiplier: 4 },
    { name: "Batáty", multiplier: 4 },
    { name: "Tortilla", multiplier: 1.25 },
    { name: "Pečivo", multiplier: 1.5 },
  ],
  leanProteins: [
    { name: "Kuřecí prsa", fixed: "150 g" },
    { name: "Krůtí prsa", fixed: "150 g" },
    { name: "Kuřecí játra", fixed: "150 g" },
    { name: "Zvěřina bez tuku", fixed: "150 g" },
    { name: "Bílý jogurt", fixed: "250 g" },
    { name: "Skyr", fixed: "250 g" },
    { name: "Řecký jogurt", fixed: "250 g" },
    { name: "Nízkotučný tvaroh", fixed: "250 g" },
    { name: "Syrečky", fixed: "110 g" },
    { name: "Treska", fixed: "200 g" },
    { name: "Candát", fixed: "175 g" },
    { name: "Tilápie", fixed: "175 g" },
    { name: "Krevety", fixed: "150 g" },
    { name: "Tuňák", fixed: "125 g" },
    { name: "Vepřová panenka", fixed: "150 g" },
    { name: "Kvalitní šunka", fixed: "140 g" },
    { name: "Protein", fixed: "40 g" },
  ],
  fattyProteins: [
    { name: "Mleté hovězí", fixed: "150 g" },
    { name: "Kuřecí stehna", fixed: "150 g" },
    { name: "Vepřové", fixed: "150 g" },
    { name: "Telecí", fixed: "150 g" },
    { name: "Losos", fixed: "150 g" },
    { name: "Pstruh", fixed: "150 g" },
    { name: "Makrela", fixed: "150 g" },
    { name: "Gouda / Eidam", fixed: "100 g" },
    { name: "Hermelín light", fixed: "130 g" },
    { name: "Mozarella light", fixed: "130 g" },
    { name: "Cottage", fixed: "250 g" },
    { name: "Polotučný tvaroh", fixed: "225 g" },
    { name: "Vejce", fixed: "4 ks" },
    { name: "Protein", fixed: "40 g + Tuky 8 g" },
  ],
  vegetables: [
    { name: "Cuketa" }, { name: "Dýně" }, { name: "Chřest" }, { name: "Špenát" },
    { name: "Okurka" }, { name: "Mrkev" }, { name: "Rajče" }, { name: "Salát" },
    { name: "Kyselé okurky", fixed: "75 g" }, { name: "Paprika" }, { name: "Ředkvičky" },
    { name: "Červená řepa" }, { name: "Kedlubna" }, { name: "Rukola" },
  ],
  fats: [
    { name: "Avokádo", multiplier: 5 }, { name: "Olivový olej" }, { name: "Olej z vlašských ořechů" },
    { name: "Vepřové sádlo" }, { name: "Olivy", multiplier: 5 }, { name: "Pekanové ořechy", multiplier: 1.25 },
    { name: "Para ořechy", multiplier: 1.25 }, { name: "Piniové ořechy", multiplier: 1.25 },
    { name: "Vlašské ořechy", multiplier: 1.25 }, { name: "Lískové ořechy", multiplier: 1.3 },
    { name: "Arašídy", multiplier: 1.4 }, { name: "Kešu", multiplier: 1.4 }, { name: "Mandle", multiplier: 1.4 },
    { name: "Pistácie", multiplier: 1.4 }, { name: "Sezam", multiplier: 1.4 }, { name: "Dýňová semínka", multiplier: 1.4 },
  ],
};

const breakfasts = {
  Tomáš: [
    { label: "Vejce + pečivo", group: "Vejce", output: "Pečivo 125 g + Vejce 3 ks" },
    { label: "Kaše s ovocem", group: "Kaše", sub: "S ovocem", output: "Ovesné vločky 67 g + Mléko 100 g + Ovoce 100 g + Protein 20 g + Tuky 8 g" },
    { label: "Kaše bez ovoce", group: "Kaše", sub: "Bez ovoce", output: "Ovesné vločky 102 g + Mléko 100 g + Protein 25 g" },
    { label: "Vejce + slanina", group: "Vejce", output: "Anglická slanina 105 g + Vejce 2 ks" },
    { label: "Vejce + tuky", group: "Vejce", output: "Vejce 5 ks + Tuky 11 g" },
    { label: "Proteinová rychlovka", group: "Proteinová rychlovka", output: "Tuky 45 g + Protein 25 g" },
  ],
  Terka: [
    { label: "Vejce + pečivo", group: "Vejce", output: "Pečivo 75 g + Vejce 2 ks" },
    { label: "Kaše s ovocem", group: "Kaše", sub: "S ovocem", output: "Ovesné vločky 17 g + Mléko 100 g + Ovoce 150 g + Protein 10 g + Tuky 10 g" },
    { label: "Kaše bez ovoce", group: "Kaše", sub: "Bez ovoce", output: "Ovesné vločky 57 g + Mléko 100 g + Protein 15 g" },
    { label: "Vejce + slanina", group: "Vejce", output: "Anglická slanina 50 g + Vejce 2 ks" },
    { label: "Vejce + tuky", group: "Vejce", output: "Vejce 3 ks + Tuky 10 g" },
    { label: "Proteinová rychlovka", group: "Proteinová rychlovka", output: "Tuky 26 g + Protein 25 g" },
  ],
};

const postWorkout = {
  Tomáš: "Ovoce 100 g + Protein 20 g + Kreatin 5 g",
  Terka: "Protein 25 g + Kreatin 5 g",
};

const mainVariants = {
  Tomáš: [
    { proteinType: "lean", label: "Více přílohy", sideBase: 90, vegRange: "50 - 200 g" },
    { proteinType: "fatty", label: "S přílohou", sideBase: 70, vegRange: "50 - 200 g" },
    { proteinType: "lean", label: "Méně přílohy + tuky", sideBase: 40, vegRange: "50 - 200 g", fatBase: 22 },
    { proteinType: "fatty", label: "Bez přílohy + tuky", vegRange: "100 - 200 g", fatBase: 30 },
  ],
  Terka: [
    { proteinType: "lean", label: "Více přílohy", sideBase: 80, vegRange: "50 - 200 g" },
    { proteinType: "fatty", label: "S přílohou", sideBase: 60, vegRange: "50 - 200 g" },
    { proteinType: "lean", label: "Méně přílohy + tuky", sideBase: 30, vegRange: "50 - 200 g", fatBase: 22 },
    { proteinType: "fatty", label: "Bez přílohy + tuky", vegRange: "100 - 200 g", fatBase: 26 },
  ],
};

const cookedRatios = {
  "Rýže": 1.9,
  "Těstoviny": 2.1,
  "Brambory": 0.9,
  "Kuřecí prsa": 0.8,
  "Mleté hovězí": 0.85,
  "Treska": 0.8,
  "Losos": 0.85,
  "Pstruh": 0.85,
};

function grams(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : String(rounded).replace(".", ",")} g`;
}

function parseGrams(text) {
  const number = parseFloat(String(text).replace(",", "."));
  return Number.isFinite(number) ? number : null;
}

function withCooked(name, amountText) {
  const raw = parseGrams(amountText);
  const ratio = cookedRatios[name];
  if (!raw || !ratio) return `${name} ${amountText}`;
  return `${name} ${amountText} (tepelně upravené ${grams(raw * ratio)})`;
}

function amountFromBase(item, base) {
  if (item.fixed) return item.fixed;
  return grams(base * (item.multiplier || 1));
}

export default function App() {
  const [person, setPerson] = useState(null);
  const [meal, setMeal] = useState(null);
  const [breakfastGroup, setBreakfastGroup] = useState(null);
  const [breakfastSub, setBreakfastSub] = useState(null);
  const [result, setResult] = useState(null);
  const [proteinType, setProteinType] = useState(null);
  const [protein, setProtein] = useState(null);
  const [variant, setVariant] = useState(null);
  const [side, setSide] = useState(null);
  const [veg, setVeg] = useState(null);
  const [fat, setFat] = useState(null);

  const resetMeal = () => {
    setMeal(null);
    setBreakfastGroup(null);
    setBreakfastSub(null);
    setResult(null);
    setProteinType(null);
    setProtein(null);
    setVariant(null);
    setSide(null);
    setVeg(null);
    setFat(null);
  };

  const resetAll = () => {
    setPerson(null);
    resetMeal();
  };

  const chooseBreakfastGroup = (group) => {
    const options = breakfasts[person].filter(item => item.group === group);
    if (options.length === 1) {
      setResult(options[0].output);
      return;
    }
    setBreakfastGroup(group);
  };

  const chooseBreakfastSub = (sub) => {
    const options = breakfasts[person].filter(item => item.group === "Kaše" && item.sub === sub);
    if (options.length === 1) {
      setResult(options[0].output);
      return;
    }
    setBreakfastSub(sub);
  };

  const breakfastChoices = useMemo(() => {
    if (!person || !breakfastGroup) return [];
    let list = breakfasts[person].filter(item => item.group === breakfastGroup);
    if (breakfastGroup === "Kaše" && breakfastSub) list = list.filter(item => item.sub === breakfastSub);
    return list;
  }, [person, breakfastGroup, breakfastSub]);

  const mainResult = useMemo(() => {
    if (!protein || !variant || !veg) return null;
    if (variant.sideBase && !side) return null;
    if (variant.fatBase && !fat) return null;

    const parts = [withCooked(protein.name, protein.fixed)];
    if (variant.sideBase) parts.push(withCooked(side.name, amountFromBase(side, variant.sideBase)));
    parts.push(`${veg.name} ${veg.fixed || variant.vegRange}`);
    if (variant.fatBase) parts.push(`${fat.name} ${amountFromBase(fat, variant.fatBase)}`);
    return parts.join(" + ");
  }, [protein, variant, side, veg, fat]);

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <h1>Jídelníček</h1>
          <p>Výběr jídla podle nastaveného plánu</p>
        </div>
        <button className="smallButton" onClick={resetAll}>Reset</button>
      </header>

      {person && <button className="back" onClick={resetMeal}>← Zpět na výběr jídla</button>}

      {!person && (
        <Section title="Vyber profil">
          {people.map(item => <Choice key={item} onClick={() => setPerson(item)}>{item}</Choice>)}
        </Section>
      )}

      {person && !meal && (
        <Section title={`${person === "Tomáš" ? "Tomáši" : "Terko"}, vyber chod`}>
          {mealTypes.map(item => (
            <Choice key={item} onClick={() => {
              setMeal(item);
              if (item === "Potréninková suplementace") setResult(postWorkout[person]);
            }}>{item}</Choice>
          ))}
        </Section>
      )}

      {person && meal === "Snídaně" && !result && (
        <Section title="Vyber typ snídaně">
          {!breakfastGroup && ["Vejce", "Kaše", "Proteinová rychlovka"].map(item => (
            <Choice key={item} onClick={() => chooseBreakfastGroup(item)}>{item}</Choice>
          ))}

          {breakfastGroup === "Kaše" && !breakfastSub && (
            <>
              <Choice onClick={() => chooseBreakfastSub("S ovocem")}>S ovocem</Choice>
              <Choice onClick={() => chooseBreakfastSub("Bez ovoce")}>Bez ovoce</Choice>
            </>
          )}

          {breakfastGroup && (breakfastGroup !== "Kaše" || breakfastSub) && breakfastChoices.map(item => (
            <Choice key={item.output} onClick={() => setResult(item.output)}>{item.label}</Choice>
          ))}
        </Section>
      )}

      {person && meal === "Hlavní jídlo" && !protein && (
        <Section title="Vyber hlavní bílkovinu">
          <div className="proteinGrid">
            <div className="proteinColumn leanColumn">
              <h3>Libové</h3>
              {foods.leanProteins.map(item => (
                <Choice key={item.name} variant="lean" onClick={() => { setProteinType("lean"); setProtein(item); }}>{item.name}</Choice>
              ))}
            </div>
            <div className="proteinColumn fattyColumn">
              <h3>Tučné</h3>
              {foods.fattyProteins.map(item => (
                <Choice key={item.name} variant="fatty" onClick={() => { setProteinType("fatty"); setProtein(item); }}>{item.name}</Choice>
              ))}
            </div>
          </div>
        </Section>
      )}

      {person && meal === "Hlavní jídlo" && protein && !variant && (
        <Section title={`Vybraná bílkovina: ${protein.name}`}>
          {mainVariants[person].filter(item => item.proteinType === proteinType).map(item => (
            <Choice key={item.label} onClick={() => setVariant(item)}>{item.label}</Choice>
          ))}
        </Section>
      )}

      {person && meal === "Hlavní jídlo" && protein && variant?.sideBase && !side && (
        <Picker title="Vyber přílohu" items={foods.sides} onPick={setSide} />
      )}

      {person && meal === "Hlavní jídlo" && protein && variant && (!variant.sideBase || side) && !veg && (
        <Picker title="Vyber zeleninu" items={foods.vegetables} onPick={setVeg} />
      )}

      {person && meal === "Hlavní jídlo" && protein && variant && veg && variant.fatBase && !fat && (
        <Picker title="Vyber tuky" items={foods.fats} onPick={setFat} />
      )}

      {(result || mainResult) && <Result text={`Varianta ${getVariantLabel(person, meal, variant, result || mainResult)}: ${result || mainResult}`} />}
    </main>
  );
}

function Section({ title, children }) {
  return <section className="card"><h2>{title}</h2><div className="choices">{children}</div></section>;
}

function Choice({ children, onClick, variant = "" }) {
  return <button className={`choice ${variant}`} onClick={onClick}>{children}</button>;
}

function Picker({ title, items, onPick }) {
  return <Section title={title}>{items.map(item => <Choice key={item.name} onClick={() => onPick(item)}>{item.name}</Choice>)}</Section>;
}

function getVariantLabel(person, meal, variant, text) {
  if (meal === "Snídaně") {
    const list = breakfasts[person];
    const index = list.findIndex(item => item.output === text);
    return index >= 0 ? index + 1 : "";
  }

  if (meal === "Potréninková suplementace") {
    return 1;
  }

  if (meal === "Hlavní jídlo" && variant) {
    const list = mainVariants[person];
    const index = list.findIndex(item => item.label === variant.label);
    return index >= 0 ? index + 1 : "";
  }

  return "";
}

function Result({ text }) {
  return <section className="result"><h2>Výsledek</h2><div className="resultText">{text}</div></section>;
}
