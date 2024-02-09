from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "Given a person's details: height 175 cm, age 21 years, weight 60 kg, and a menu of pizza, salad, and pasta. Recommend a meal for today."}
  ]
)

print(completion.choices[0].message)