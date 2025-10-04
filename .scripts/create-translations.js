const fs = require("node:fs");
const path = require("node:path");

// Récupérer le nom du module et le dossier cible depuis les arguments
const moduleName = process.argv[2];
const targetDir = process.argv[3]; // Dossier du fichier ouvert dans VS Code

if (!moduleName) {
  console.error("❌ Veuillez spécifier un nom de module !");
  console.log("Usage: node scripts/create-translations.js <nom-du-module> [dossier-cible]");
  console.log("Exemple: node scripts/create-translations.js pages");
  process.exit(1);
}

// Chemin vers le dossier de traductions
const translationsDir = path.join(__dirname, "..", "src", "translations");

// Déterminer où créer le module
let moduleDir;

if (targetDir?.includes("translations")) {
  // Si on a un dossier cible dans translations, créer là
  moduleDir = path.join(targetDir, moduleName);
  console.log(`📍 Création dans le dossier actuel: ${targetDir}`);
} else {
  // Sinon, créer à la racine de messages
  const messagesDir = path.join(translationsDir, "messages");
  moduleDir = path.join(messagesDir, moduleName);
  console.log(`📍 Création à la racine: ${messagesDir}`);
}

// Créer le dossier du module s'il n'existe pas
if (!fs.existsSync(moduleDir)) {
  fs.mkdirSync(moduleDir, { recursive: true });
  console.log(`📁 Dossier créé: ${moduleDir}`);
} else {
  console.log(`📁 Dossier existe déjà: ${moduleDir}`);
}

// Templates pour les fichiers
const interfaceName = `I${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Translations`;

const frTemplate = `import type ${interfaceName} from "./${moduleName}.translations";

const ${moduleName}Fr: ${interfaceName} = {
  // Add your French translations here
};

export default ${moduleName}Fr;
`;

const enTemplate = `import type ${interfaceName} from "./${moduleName}.translations";

const ${moduleName}En: ${interfaceName} = {
  // Add your English translations here
};

export default ${moduleName}En;
`;

const typeTemplate = `interface ${interfaceName} {
  // Ajoutez vos types de traduction ici
}

export default ${interfaceName};`;

const pageTypeTemplate = `import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";

interface ${interfaceName} extends IDefaultPageTranslations {
  // Ajoutez vos types de traduction ici
}

export default ${interfaceName};`;

// Créer les fichiers
const files = [
  { name: "fr.ts", content: frTemplate },
  { name: "en.ts", content: enTemplate },
  {
    name: `${moduleName}.translations.ts`,
    content: moduleName.toLowerCase().includes("page") ? pageTypeTemplate : typeTemplate,
  },
];

files.forEach((file) => {
  const filePath = path.join(moduleDir, file.name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Fichier créé: ${file.name}`);
  } else {
    console.log(`⚠️  Fichier existe déjà: ${file.name}`);
  }
});

console.log(`\n🎉 Module de traduction '${moduleName}' créé avec succès !`);
