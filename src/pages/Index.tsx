import { useSearchParams } from "react-router-dom";
import { useState } from "react";

/**
 * ============================================
 *  PÁGINA DE CANCELACIÓN — MULTI-TENANT
 * ============================================
 *
 *  URL de cancelación que genera n8n para cada lead:
 *  https://tucancel.com?id=ABC123&client_id=inmo_x
 *
 *  El parámetro "id"        → identifica la cita concreta
 *  El parámetro "client_id" → identifica la inmobiliaria
 *
 *  n8n recibe ambos y sabe exactamente qué Sheet,
 *  Calendar y agente gestionar. Sin tocar este código.
 *
 *  PERSONALIZACIÓN:
 *  🎨 Colores → src/index.css
 *  📝 Textos  → edita directamente en este archivo
 */

const WEBHOOK_URL = "https://dariikk.app.n8n.cloud/webhook/cancelar-cita";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── MULTI-TENANT: leer id y client_id de la URL ──
  // Ejemplo: https://tucancel.com?id=ABC123&client_id=inmo_x
  const id = searchParams.get("id");
  const clientId = searchParams.get("client_id");

  const handleCancel = async () => {
    if (!id) {
      setError("❌ No se encontró el ID de la cita en la URL.");
      return;
    }
    if (!clientId) {
      setError("❌ URL incorrecta. Contacta con tu asesor.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,                  // identifica la cita
          client_id: clientId, // ← NUEVO: identifica la inmobiliaria
        }),
      });

      if (response.ok) {
        setCancelled(true);
      } else {
        setError("❌ Error del servidor. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("❌ Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">

        {/* === LOGO === */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-3xl font-bold text-primary-foreground">
            ✕
          </div>
        </div>

        {!cancelled ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">
              ¿Deseas cancelar tu cita?
            </h1>
            <p className="text-muted-foreground">
              Esta acción no se puede deshacer. Se notificará al equipo.
            </p>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleCancel}
                disabled={loading || !id || !clientId}
                className="w-full rounded-lg bg-cancel px-6 py-3 font-medium text-cancel-foreground transition-colors hover:bg-cancel-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cancelando..." : "Confirmar cancelación"}
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                disabled={loading}
              >
                Volver atrás
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✓
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Cancelación confirmada
            </h1>
            <p className="text-muted-foreground">
              Tu cita ha sido cancelada correctamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
