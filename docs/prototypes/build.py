"""Assemble category.html and model.html from templates, shared CSS/JS, data and images. Usage: python3 -I build.py"""
import json, pathlib

d = pathlib.Path(__file__).parent
data = json.loads((d / "data.json").read_text())
img = json.loads((d / "images.json").read_text())
css = (d / "base.css").read_text()
js = (d / "base.js").read_text()
cards = {m["slug"]: img[f"card_{m['slug']}"] for m in data["models"]}
gallery = [img[f"gal_{n}"] for n in range(1, 8)]
thumbs = [img[f"thumb_{n}"] for n in range(1, 8)]

home_img = json.loads((d / "home-images.json").read_text())
for name in ("category", "model", "home"):
    s = (d / f"{name}.src.html").read_text()
    s = s.replace("{{css:base}}", css).replace("{{js:base}}", js)
    s = s.replace("{{data}}", json.dumps(data, ensure_ascii=False).replace("</", "<\\/"))
    s = s.replace("{{img:cards}}", json.dumps(cards)).replace("{{img:gallery}}", json.dumps(gallery)).replace("{{img:thumbs}}", json.dumps(thumbs))
    import re
    s = re.sub(r"\{\{home:(\w+)\}\}", lambda m: home_img[m.group(1)], s)
    assert "{{" not in s, name
    (d / f"{name}.html").write_text(s)
    print(name, f"{len(s) / 1e6:.1f} MB")
