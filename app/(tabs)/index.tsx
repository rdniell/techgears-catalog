import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from "react-native";

// ─── Data Produk ───────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "1",
    name: "Mechanical Keyboard",
    price: "Rp 850.000",
    emoji: "⌨️",
    badge: true,   // ← produk ini punya badge "OFF"
    badgeText: "20% OFF",
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: "Rp 320.000",
    emoji: "🖱️",
    badge: false,
    badgeText: "",
  },
  {
    id: "3",
    name: "USB-C Hub 7-in-1",
    price: "Rp 420.000",
    emoji: "🔌",
    badge: false,
    badgeText: "",
  },
  {
    id: "4",
    name: "IPS Monitor 24\"",
    price: "Rp 2.150.000",
    emoji: "🖥️",
    badge: false,
    badgeText: "",
  },
];

// ─── Komponen Card ─────────────────────────────────────────────
type Product = {
  id: string;
  name: string;
  price: string;
  emoji: string;
  badge: boolean;
  badgeText: string;
};

function ProductCard({
  product,
  cardWidth,
}: {
  product: Product;
  cardWidth: number;
}) {
  return (
    // position: 'relative' adalah default, tapi ditulis eksplisit
    // supaya absolute child (badge) bisa diposisikan relatif ke card ini
    <View style={[styles.card, { width: cardWidth }]}>
      {/* ── Emoji area ── */}
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{product.emoji}</Text>
      </View>

      {/* ── Info produk ── */}
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.productPrice}>{product.price}</Text>

      {/* ── Absolute Badge "OFF" ── */}
      {product.badge && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.badgeText}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Screen Utama ──────────────────────────────────────────────
export default function Index() {
  // useWindowDimensions → responsive saat layar diputar (landscape/portrait)
  const { width } = useWindowDimensions();

  const COLUMNS = 2;
  const PADDING = 16;
  const GAP = 12;
  // Hitung lebar card secara dinamis berdasarkan lebar layar & jumlah kolom
  const cardWidth =
    (width - PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

  // Pisahkan produk jadi baris-baris (2 per baris)
  const rows: Product[][] = [];
  for (let i = 0; i < PRODUCTS.length; i += COLUMNS) {
    rows.push(PRODUCTS.slice(i, i + COLUMNS));
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ══════════════════════════════════════════
            HEADER — flexDirection: 'column' (default)
            Semua child tersusun vertikal & di-center
        ══════════════════════════════════════════ */}
        <View style={styles.header}>
          <Text style={styles.storeBadge}>⚡ OFFICIAL STORE</Text>
          <Text style={styles.storeTitle}>TechGears</Text>
          <Text style={styles.storeSubtitle}>
            Gear up. Stay ahead. 🚀
          </Text>
          <View style={styles.divider} />
        </View>

        {/* ══════════════════════════════════════════
            SECTION LABEL
        ══════════════════════════════════════════ */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Katalog Produk</Text>
          <Text style={styles.sectionCount}>
            {PRODUCTS.length} items
          </Text>
        </View>

        {/* ══════════════════════════════════════════
            PRODUCT GRID
            Setiap baris menggunakan flexDirection: 'row'
            sehingga card-card berbaris horizontal
        ══════════════════════════════════════════ */}
        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View
              key={`row-${rowIndex}`}
              style={[styles.gridRow, { gap: GAP }]}
            >
              {row.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cardWidth={cardWidth}
                />
              ))}
            </View>
          ))}
        </View>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 TechGears · All rights reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const COLORS = {
  bg: "#0a0a0f",
  surface: "#13131a",
  card: "#1a1a24",
  border: "#2a2a3a",
  accent: "#7c6dfa",       // ungu electric
  accentAlt: "#fa6d8f",    // pink neon
  gold: "#f5c542",
  text: "#e8e8f0",
  muted: "#6b6b80",
  badge: "#ff3b5c",
};

const styles = StyleSheet.create({
  // ── Root ──
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Header ──
  // flexDirection default = 'column' → child tersusun vertikal
  // alignItems: 'center'            → child di-center horizontal
  header: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  storeBadge: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  storeTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -1,
    textAlign: "center",
  },
  storeSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 6,
    textAlign: "center",
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: 20,
  },

  // ── Section label ──
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  sectionCount: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: "600",
  },

  // ── Grid ──
  grid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  // Setiap baris menggunakan flexDirection: 'row'
  // agar card-card berjajar horizontal (2 kolom per baris)
  gridRow: {
    flexDirection: "row",
  },

  // ── Card ──
  // position: 'relative' (default) → diperlukan agar badge absolute
  // dapat diposisikan relatif terhadap card ini
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    overflow: "hidden",
    position: "relative",   // ← anchor untuk badge absolute
  },
  emojiBox: {
    width: 52,
    height: 52,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emoji: {
    fontSize: 26,
  },
  productName: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.accent,
  },

  // ── Absolute Badge ──
  // position: 'absolute' → keluar dari flow normal
  // top/right menentukan pojok kanan atas card
  discountBadge: {
    position: "absolute",   // ← ABSOLUTE POSITIONING
    top: 10,
    right: 10,
    backgroundColor: COLORS.badge,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    zIndex: 10,
  },
  discountText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.5,
  },

  // ── Footer ──
  footer: {
    marginTop: 40,
    alignItems: "center",
    paddingBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.muted,
  },
});

