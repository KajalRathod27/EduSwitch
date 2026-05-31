import chromadb
import pandas as pd
import uuid
import os
import glob

def ingest_csvs(data_folder: str = "../data"):
    client = chromadb.PersistentClient(path="./chroma_db")

    # Delete existing collection to re-ingest cleanly
    try:
        client.delete_collection("college_collection")
    except:
        pass

    collection = client.create_collection("college_collection")

    all_files = glob.glob(os.path.join(data_folder, "*.csv"))
    all_rows = []

    for f in all_files:
        try:
            df = pd.read_csv(f)
            # Normalize column names
            df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
            all_rows.append(df)
            print(f"Loaded {len(df)} rows from {f}")
        except Exception as e:
            print(f"Skipping {f}: {e}")

    if not all_rows:
        print("No CSV files found!")
        return

    combined = pd.concat(all_rows, ignore_index=True)

    # Map your CSV column names here
    col_map = {
        "college_name": ["college name", "college_name", "name"],
        "course":       ["course", "stream"],
        "city":         ["city"],
        "ownership":    ["ownership"],
        "facilities":   ["facilities"],
        "duration":     ["duration"],
        "link":         ["college link", "college_link", "link"],
    }

    def find_col(df, options):
        for o in options:
            if o in df.columns:
                return o
        return None

    docs, ids, metadatas = [], [], []

    for _, row in combined.iterrows():
        meta = {}
        for key, options in col_map.items():
            col = find_col(combined, options)
            meta[key] = str(row.get(col, "")) if col else ""

        text = f"{meta['college_name']} {meta['course']} {meta['city']} {meta['facilities']}"
        docs.append(text)
        ids.append(str(uuid.uuid4()))
        metadatas.append(meta)

    # Batch insert
    batch = 500
    for i in range(0, len(docs), batch):
        collection.add(
            documents=docs[i:i+batch],
            ids=ids[i:i+batch],
            metadatas=metadatas[i:i+batch]
        )
        print(f"Inserted batch {i//batch + 1}")

    print(f"✅ Ingested {len(docs)} colleges into ChromaDB")

if __name__ == "__main__":
    ingest_csvs()