import { useState } from "react";

/**
 * ============================================
 *  PÁGINA DE CANCELACIÓN
 * ============================================
 *  
 *  PERSONALIZACIÓN RÁPIDA:
 *  
 *  🎨 Colores → src/index.css (variables CSS)
 *     --cancel-bg         → color del botón
 *     --cancel-bg-hover   → color hover del botón
 *     --cancel-foreground  → color del texto del botón
 *     --primary            → color principal de la marca
 *  
 *  🖼️ Logo → reemplaza la imagen en src/assets/logo.png
 *     o cambia la URL en el <img> de abajo
 *  
 *  📝 Textos → edita directamente en este archivo
 * ============================================
 */

const Index = () => {
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        {/* === LOGO: reemplaza src o añade tu imagen === */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-3xl font-bold text-primary-foreground">
            ✕
          </div>
          {/* Para usar un logo personalizado, descomenta esto:
          <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          */}
        </div>

        {!cancelled ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">
              ¿Deseas cancelar?
            </h1>
            <p className="text-muted-foreground">
              Esta acción no se puede deshacer. Por favor, confirma que deseas
              continuar con la cancelación.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleCancel}
                className="w-full rounded-lg bg-cancel px-6 py-3 font-medium text-cancel-foreground transition-colors hover:bg-cancel-hover"
              >
                Confirmar cancelación
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
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
              Tu solicitud ha sido procesada correctamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
