/*         FwX: EDITOR-NBT          */
/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */


document.querySelector("[rel='icon']").href = "https://sfwx.github.io/image/icon/mcstructure.png";

function onloadBundle() {
  if (window.buffer) {
    window.Buffer = window.buffer.Buffer;
    document.getElementById("fwxButton").disabled = false;
  }
}

function generateJson() {
  if (typeof itemJson !== "object") {
    alert("Não foi possível carregar item.js");
    return;
  }
  const json = structuredClone(itemJson);
  const item = json.value.structure.value.entities.value.value[0];
  item.Item.value.Count.value = Math.min(Math.max(Number(document.getElementById("count").value), 1), 64);
  item.Item.value.Name.value = document.getElementById("itemId").value || "minecraft:diamond";
  if (document.getElementById("displayName").value.trim()) {
    item.Item.value.tag.value.display.value.Name.value = document.getElementById("displayName").value;
  }
  else {
    delete item.Item.value.tag.value.display.value.Name;
  }
  if (document.getElementById("lore").value.trim()) {
    item.Item.value.tag.value.display.value.Lore.value.value = document.getElementById("lore").value.trim().split("\n");
  }
  else {
    delete item.Item.value.tag.value.display.value.Lore;
  }
  if (!document.getElementById("displayName").value.trim() && !document.getElementById("lore").value.trim()) {
    delete item.Item.value.tag.value.display;
  }
  try {
    if (!document.getElementById("ench").value.trim()) {
delete item.Item.value.tag.value.ench;
    }
    else {
item.Item.value.tag.value.ench.value.value = JSON.parse(document.getElementById("ench").value);
if (!item.Item.value.tag.value.ench.value.value.length) {
  delete item.Item.value.tag.value.ench;
}
    }
  }
  catch {
    alert("Json de encantamentos inválido.");
    return;
  }
  if (!Number(document.getElementById("unbreakable").value)) {
    delete item.Item.value.tag.value.Unbreakable;
  }
  if (!item.Item.value.tag.value.display && !item.Item.value.tag.value.ench && !item.Item.value.tag.value.Unbreakable) {
    delete item.Item.value.tag;
  }
  if (document.getElementById("tags").value.trim()) {
    item.Tags.value.value = document.getElementById("tags").value.trim().split(", ");
  }
  else {
    item.Tags.value.value = [ "FwX404" ];
  }
  if (document.getElementById("customName").value.trim()) {
    item.CustomName.value = document.getElementById("customName").value;
  }
  else {
    delete item.CustomName;
  }
  return json;
}
function DESABLEDdownloadItem() {
  const blob = new Blob(
    [JSON.stringify(generateJson())],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = document.getElementById("itemId").value.split(":")[1] + ".json";
  a.click();
  URL.revokeObjectURL(url);
}

async function downloadItem() {
  const jsonData = generateJson();
  if (!jsonData) return; // Caso o JSON de encantamentos seja inválido

  try {
    // 1. Converter o objeto JSON tipado para o buffer binário NBT
    // O Minecraft Bedrock usa Little Endian (le), por isso usamos 'writeUncompressed'
    // Se for para Java Edition, o padrão é Big Endian.
    const nbtBuffer = await prismarineNbt.writeUncompressed(jsonData, 'little');

    // 2. Criar o Blob binário
    const blob = new Blob([nbtBuffer], { type: "application/octet-stream" });
    
    // 3. Definir a extensão (geralmente .mcstructure ou .nbt para Bedrock)
    const fileName = (document.getElementById("itemId").value.split(":")[1] || "item") + ".mcstructure";

    // 4. Processo de download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    
    // Limpar memória
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("Erro na conversão NBT:", error);
    alert("Erro ao converter para binário. Verifique o console.");
  }
}

/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */
