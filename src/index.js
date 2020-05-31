function layer(_, { name, assets, version: { assets: assetContents } }) {
    if (!fetch) {
        console.warn("SVG Content extension only works in Zeplin Web App.");
        return;
    }

    if (!assets.length) {
        return;
    }

    const layerAssets = assetContents.find(({ layerName }) => layerName === name);
    if (!layerAssets) {
        return;
    }

    const svgAsset = layerAssets.contents.find(({ format }) => format === "svg");
    if (!svgAsset) {
        return;
    }

    return fetch(svgAsset.url, { mode: "cors" })
        .then(response => response.text())
        .then(code => ({
            code,
            language: "svg"
        }));
}

export default {
    layer
};
