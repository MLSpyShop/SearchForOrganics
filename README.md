# Search For Organics

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![Tests](https://img.shields.io/badge/tests-pytest-brightgreen.svg)](https://docs.pytest.org/)

Search For Organics is a focused machine learning project for detecting and searching for "organic" products from images and product metadata. It provides reference training code, evaluation script[...]

This README has been expanded with concrete examples, a recommended baseline configuration, and a minimal API example — replace dataset/model paths and any API keys with your project-specific val[...]

## Quick links

- Repository: https://github.com/MLSpyShop/Search-For-Organics
- Website: https://mlspyshop.github.io/Search-For-Organics/
- README (this file): README.md

## Features

- Image classifier to detect organic vs non-organic items (baseline: ResNet-50)
- Text search over product metadata (keyword + embedding-based similarity)
- Training and evaluation scripts with configurable YAML-based configs
- Minimal FastAPI server for serving image predictions
- Example configs, tests, and reproducible run instructions

## Repository layout

- data/                - datasets (images, metadata CSVs)
- src/                 - training, models, inference, and search code
- api/                 - minimal FastAPI server
- configs/             - example YAML configs (resnet50.yaml, default.yaml)
- notebooks/           - EDA and experiment notebooks
- models/              - saved checkpoints and artifacts
- scripts/             - data download, preprocessing, helpers
- tests/               - pytest tests

## Getting started

Requirements

- Python 3.8+
- Recommended: virtualenv or conda

Install

```bash
python -m venv .venv
source .venv/bin/activate    # macOS / Linux
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

If you plan to use GPU acceleration, install the appropriate PyTorch/torchaudio/torchvision build for your CUDA version (see https://pytorch.org).

Data layout (recommended)

```
data/
  images/
    train/
      organic/
      non_organic/
    val/
      organic/
      non_organic/
  metadata/
    products.csv   # product_id,title,description,organic_label (0/1)
```

If your data lives on S3/GCS, set the `data_root` config to a mounted path or adapt `scripts/load_data.py`.

Baseline configuration (configs/resnet50.yaml)

```yaml
model:
  name: resnet50
  pretrained: true
  num_classes: 2

dataset:
  input_size: 224
  mean: [0.485, 0.456, 0.406]
  std: [0.229, 0.224, 0.225]

training:
  epochs: 30
  batch_size: 32
  lr: 1e-3
  weight_decay: 1e-4
  optimizer: adam
  scheduler:
    name: cosine

augmentations:
  - RandomResizedCrop
  - RandomHorizontalFlip
  - ColorJitter

data:
  train_dir: data/images/train
  val_dir: data/images/val
```

Quick start — training

```bash
# train with the baseline resnet50 config
python src/train.py --config configs/resnet50.yaml --device cuda:0
```

Training options (common)

- `--config`: YAML config file path
- `--data-dir`: override dataset root
- `--epochs`: number of epochs
- `--batch-size`: batch size
- `--checkpoint`: load a checkpoint for fine-tuning or evaluation

Evaluation

```bash
python src/evaluate.py --checkpoint models/best.pt --data-dir data/images
```

This will print accuracy, precision, recall, F1, and save confusion matrix and ROC/PR curves to `runs/`.

Inference examples

- CLI image prediction

```bash
python src/infer.py --image examples/apple.jpg --checkpoint models/best.pt
# Output: {"label": "organic", "score": 0.92}
```

- Local API (FastAPI) — minimal example

Create `api/main.py` (example provided in repo). Run:

```bash
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Then POST JSON to `http://localhost:8000/predict` with body:

```json
{ "image_url": "https://.../apple.jpg" }
```

Response example:

```json
{ "label": "organic", "score": 0.92 }
```

Minimal FastAPI server (api/main.py) — reference

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class PredictRequest(BaseModel):
    image_url: Optional[str]

@app.post('/predict')
async def predict(req: PredictRequest):
    if not req.image_url:
        raise HTTPException(status_code=400, detail='image_url required')
    # Example flow: download image, preprocess, run model, return label+score
    # Replace with model loading and real inference
    return {"label": "organic", "score": 0.92}
```

Text search

The repo includes a text search module that supports two modes:

- Keyword filtering: find product metadata rows where `title` or `description` contains organic-related keywords (e.g. "organic", "certified organic", "USDA organic").
- Embedding similarity: embed descriptions with a small sentence transformer and run nearest-neighbor search for semantic matches.

Example CLI:

```bash
python src/search_text.py --query "organic apple" --metadata data/metadata/products.csv
```

Testing

Run unit/integration tests with pytest:

```bash
pytest -q
```

CI

Add a GitHub Actions workflow `.github/workflows/python-app.yml` that runs the test suite and lints the code on push/PR.

Development tips

- Use a reproducible experiments folder `runs/` for logs, checkpoints, and plots.
- Log experiments with Weights & Biases, TensorBoard, or plain CSVs for reproducibility.
- Save model metadata and training hyperparameters alongside checkpoints.

Files you might want to add next

- configs/resnet50.yaml (example provided above)
- api/main.py (FastAPI server example)
- LICENSE (MIT) — adding a LICENSE file is recommended
- CONTRIBUTING.md with PR checklist

License

This project is distributed under the MIT License. See the included LICENSE file for details.

Acknowledgments

- Baseline backbones: ImageNet-pretrained ResNet models
- Example ideas inspired by open-source model-zoo projects

Maintainers & Contact

- MLSpyShop team
- For questions or help, open an issue in this repository.
