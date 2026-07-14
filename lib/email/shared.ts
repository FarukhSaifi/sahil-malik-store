import type { EditorialEmailOptions } from "@/types";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function wrapEditorialEmail({ title, preheader, bodyHtml }: EditorialEmailOptions): string {
  const safeTitle = escapeHtml(title);
  const safePreheader = preheader ? escapeHtml(preheader) : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f7f5f2;font-family:Georgia,'Times New Roman',serif;color:#111111;line-height:1.6;">
    ${safePreheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safePreheader}</div>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background-color:#ffffff;border:1px solid #e8e4de;">
            <tr>
              <td style="padding:32px 28px 12px;border-bottom:1px solid #e8e4de;">
                <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b6b6b;">Sahil Malik Couture</p>
                <h1 style="margin:12px 0 0;font-size:22px;font-weight:normal;letter-spacing:0.08em;text-transform:uppercase;">${safeTitle}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${bodyHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function detailRow(label: string, value: string): string {
  return `<p style="margin:0 0 12px;"><strong style="display:inline-block;min-width:88px;color:#6b6b6b;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">${escapeHtml(label)}</strong><br /><span style="font-size:15px;">${value}</span></p>`;
}

export function sectionHeading(label: string): string {
  return `<h2 style="margin:28px 0 12px;font-size:13px;font-weight:normal;letter-spacing:0.14em;text-transform:uppercase;color:#111111;">${escapeHtml(label)}</h2>`;
}

export function toAbsoluteAssetUrl(src: string, siteUrl: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `${siteUrl}${src.startsWith("/") ? src : `/${src}`}`;
}
