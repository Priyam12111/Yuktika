from django.shortcuts import render
from django.http import JsonResponse
from joblib import load
import wikipedia

import warnings
warnings.filterwarnings("ignore")

def predict_disease_from_symptom(data):
    loaded_data = load(r'static\random_forest2.joblib')
    preprocessor = loaded_data['preprocessor']
    dtr_reg = loaded_data['model']
    label_encoder2 = loaded_data['label_encoder2']
    new_input_transformed = preprocessor.transform(data)

    predictions = [int(dtr_reg.predict(new_input_transformed))]

    output = (label_encoder2.inverse_transform(predictions))
    print(output[0])
    if (output[0] != "None"):
        return output[0]+f", \n{get_wiki_summary(output[0])}"
    else:
        return output[0]

def indre(request):
    if request.method == 'POST':
        selected_suggestion = request.POST.get('data')
        newselected = (selected_suggestion).replace("[", "").replace("]", "").replace('"', '').split(",")
        result = (predict_disease_from_symptom([newselected]))
        return JsonResponse({'result': result})

    return render(request, "diseaseimplement.html")

def get_wiki_summary(topic):
    try:
        summary = wikipedia.summary(topic, sentences=2)  # Fetch 2 sentences for a brief summary
        return summary
    except wikipedia.exceptions.DisambiguationError as e:
        return "Multiple Wikipedia articles found. Please specify more precisely:" + str(e.options)
    except wikipedia.exceptions.PageError:
        return "Article not found on Wikipedia."


def about(request):
    return render(request, "about.html")


# # Example usage:
# topic = "Python (programming language)"
# summary = get_wiki_summary(topic)
# print(summary)