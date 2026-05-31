import os

ROOT_DIR = r"C:\Users\bhara\OneDrive\Desktop\EduSwitch"

# Anything containing these words will be ignored
EXCLUDE_KEYWORDS = [
    "node_modules", "__pycache__", ".git", ".venv", "venv", "env",
    "dist", "build", ".idea", ".vscode",
    "chromadb", "cache", "logs", "tmp",
    "scripts", "migrations",
    ".next", ".parcel", ".turbo",
    ".pytest", ".mypy"
]

def should_exclude(name):
    name_lower = name.lower()
    return any(keyword in name_lower for keyword in EXCLUDE_KEYWORDS)

def print_tree(start_path, prefix=""):
    try:
        items = sorted(os.listdir(start_path))
    except:
        return

    # Filter only directories and remove junk
    items = [
        item for item in items
        if os.path.isdir(os.path.join(start_path, item))
        and not should_exclude(item)
    ]

    for index, item in enumerate(items):
        path = os.path.join(start_path, item)
        connector = "└── " if index == len(items) - 1 else "├── "

        print(prefix + connector + item)

        extension = "    " if index == len(items) - 1 else "│   "
        print_tree(path, prefix + extension)

if __name__ == "__main__":
    print("\nEduSwitch Clean Structure (Final):\n")
    print_tree(ROOT_DIR)