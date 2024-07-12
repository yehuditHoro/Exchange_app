from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

currencies = ['USD', 'EUR', 'GBP', 'CNY', 'ILS']

class ExchangeRateResponse(BaseModel):
    base_currency: str
    rates: dict

@app.get("/api/available-currencies")
async def get_available_currencies():
    return {"currencies": currencies}

@app.get("/api/exchange-rates/{base_currency}", response_model=ExchangeRateResponse)
async def get_exchange_rates(base_currency: str):
    if base_currency not in currencies:
        raise HTTPException(status_code=400, detail="Invalid currency")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://api.exchangerate-api.com/v4/latest/{base_currency}")
            response.raise_for_status()
            data = response.json()

        rates = {currency: data['rates'][currency] for currency in currencies if currency != base_currency}
        return {"base_currency": base_currency, "rates": rates}
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Failed to fetch exchange rates: {str(e)}")
    except KeyError as e:
        raise HTTPException(status_code=500, detail=f"Unexpected response format: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
