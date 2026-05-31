# from sklearn.ensemble import RandomForestClassifier
# import numpy as np

# STREAMS = {
#     "Science": 1,
#     "Commerce": 2,
#     "Arts": 3,
#     "Engineering": 4,
#     "Management": 5,
#     "Design": 6,
#     "Architecture": 7,
#     "Law": 8,
#     "Pharmacy": 9,
#     "Medical": 10,
# }

# EXAMS = {
#     "Engineering":   ["JEE Main", "MHT CET", "BITSAT", "VITEEE"],
#     "Management":    ["CAT", "XAT", "CMAT", "MAT", "SNAP"],
#     "Design":        ["UCEED", "NID DAT", "CEED"],
#     "Architecture":  ["NATA", "JEE B.Arch"],
#     "Law":           ["CLAT", "AILET", "LSAT India"],
#     "Pharmacy":      ["MHT CET", "GPAT", "NIPER JEE"],
#     "Medical":       ["NEET", "AIIMS"],
# }

# class CareerPredictor:
#     def __init__(self):
#         self.model = RandomForestClassifier(n_estimators=100, random_state=42)
#         # Training data: [from_stream_id, to_stream_id, marks] → success (1/0)
#         X = [
#             [1,4,85],[1,4,70],[1,4,55],[1,5,75],[1,10,90],
#             [2,5,80],[2,5,65],[2,8,72],[2,6,68],[2,3,60],
#             [3,8,78],[3,5,65],[3,6,70],[3,3,55],[3,4,40],
#             [4,5,85],[4,6,75],[4,7,80],[4,8,65],[4,10,50],
#             [5,8,75],[5,6,70],[5,3,60],[6,7,80],[6,5,65],
#         ]
#         y = [1,1,0,1,1, 1,1,1,1,1, 1,1,1,0,0, 1,1,1,1,0, 1,1,1,1,1]
#         self.model.fit(X, y)

#     def predict(self, from_stream: str, to_stream: str, marks: int) -> dict:
#         fs = STREAMS.get(from_stream, 1)
#         ts = STREAMS.get(to_stream, 4)
#         prob = self.model.predict_proba([[fs, ts, marks]])[0][1]
#         score = round(prob * 100, 1)

#         if score >= 75:
#             verdict = "High"
#             color = "green"
#             advice = "Great transition potential! Focus on entrance exam prep."
#         elif score >= 50:
#             verdict = "Moderate"
#             color = "amber"
#             advice = "Achievable with dedicated effort. Consider bridge courses."
#         else:
#             verdict = "Challenging"
#             color = "red"
#             advice = "Challenging but not impossible. Seek mentorship and gap year options."

#         return {
#             "probability": score,
#             "verdict": verdict,
#             "color": color,
#             "advice": advice,
#             "exams": EXAMS.get(to_stream, [])
#         }

from sklearn.ensemble import RandomForestClassifier

STREAMS = {
    "Science": 1,
    "Commerce": 2,
    "Arts": 3,
    "Engineering": 4,
    "Management": 5,
    "Design": 6,
    "Architecture": 7,
    "Law": 8,
    "Pharmacy": 9,
    "Medical": 10,
}

EXAMS = {
    "Engineering":  ["JEE Main", "MHT CET", "BITSAT", "VITEEE"],
    "Management":   ["CAT", "XAT", "CMAT", "MAT", "SNAP"],
    "Design":       ["UCEED", "NID DAT", "CEED"],
    "Architecture": ["NATA", "JEE B.Arch"],
    "Law":          ["CLAT", "AILET", "LSAT India"],
    "Pharmacy":     ["MHT CET", "GPAT", "NIPER JEE"],
    "Medical":      ["NEET", "AIIMS"],
}

class CareerPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        X = [
            [1,4,85],[1,4,70],[1,4,55],[1,5,75],[1,10,90],
            [2,5,80],[2,5,65],[2,8,72],[2,6,68],[2,3,60],
            [3,8,78],[3,5,65],[3,6,70],[3,3,55],[3,4,40],
            [4,5,85],[4,6,75],[4,7,80],[4,8,65],[4,10,50],
            [5,8,75],[5,6,70],[5,3,60],[6,7,80],[6,5,65],
        ]
        y = [1,1,0,1,1, 1,1,1,1,1, 1,1,1,0,0, 1,1,1,1,0, 1,1,1,1,1]
        self.model.fit(X, y)

    def predict(self, from_stream: str, to_stream: str, marks: int) -> dict:
        fs    = STREAMS.get(from_stream, 1)
        ts    = STREAMS.get(to_stream, 4)
        prob  = self.model.predict_proba([[fs, ts, marks]])[0][1]
        score = round(prob * 100, 1)

        if score >= 75:
            verdict = "High"
            color   = "green"
            advice  = "Great transition potential! Focus on entrance exam prep."
        elif score >= 50:
            verdict = "Moderate"
            color   = "amber"
            advice  = "Achievable with dedicated effort. Consider bridge courses."
        else:
            verdict = "Challenging"
            color   = "red"
            advice  = "Challenging but not impossible. Seek mentorship and gap year options."

        return {
            "probability": score,
            "verdict":     verdict,
            "color":       color,
            "advice":      advice,
            "exams":       EXAMS.get(to_stream, [])
        }