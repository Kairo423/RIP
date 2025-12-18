from .clients_endpoints import router as clients_router
from .real_estate_endpoints import router as real_estate_router
from .users_endpoints import router as users_router
from .ownership_types_endpoints import router as ownership_types_router
from .restriction_types_endpoints import router as restriction_types_router
from .ownership_endpoints import router as ownership_router
from .restrictions_endpoints import router as restrictions_router
from .deals_endpoints import router as deals_router
from .auth import router as auth_router
from .dashboard_endpoints import router as dashboard_router

# список всех роутеров для удобства регистрации
all_routers = [
    clients_router,
    real_estate_router,
    users_router,
    ownership_types_router,
    restriction_types_router,
    ownership_router,
    restrictions_router,
    deals_router,
    auth_router,
    dashboard_router,
]
