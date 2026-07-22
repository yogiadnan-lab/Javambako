const images = [
  'WhatsApp Image 2025-05-27 at 04.05.16_34152d91.webp',
  'WhatsApp Image 2025-05-27 at 04.05.17_054feabb.webp',
  'WhatsApp Image 2025-05-27 at 04.05.17_2ae4b077.webp',
  'WhatsApp Image 2025-05-27 at 04.05.17_7594aacd.webp',
  'WhatsApp Image 2025-05-27 at 04.05.18_7b00cf92.webp',
  'WhatsApp Image 2025-05-27 at 04.05.18_a2404d8c.webp',
  'WhatsApp Image 2025-05-27 at 04.05.18_dc8f50eb.webp',
  'WhatsApp Image 2025-05-27 at 04.05.19_05b10941.webp',
  'WhatsApp Image 2025-05-27 at 04.05.19_89754b41.webp',
  'WhatsApp Image 2025-05-27 at 04.05.19_ec7cf4ed.webp',
  'WhatsApp Image 2025-05-27 at 04.05.20_549f2a62.webp',
  'WhatsApp Image 2025-05-27 at 04.05.20_78d9824f.webp',
  'WhatsApp Image 2025-05-27 at 04.05.20_c054b181.webp',
  'WhatsApp Image 2025-05-27 at 04.05.21_ad228a90.webp',
  'WhatsApp Image 2025-05-27 at 04.05.21_f555492b.webp',
  'WhatsApp Image 2025-05-27 at 04.05.22_294a72e4.webp',
  'WhatsApp Image 2025-05-27 at 04.05.22_29582399.webp',
  'WhatsApp Image 2025-05-27 at 04.05.22_db8710f3.webp',
  'WhatsApp Image 2025-05-27 at 04.05.22_e5bd19ce.webp',
  'WhatsApp Image 2025-05-27 at 04.05.23_82fece38.webp',
  'WhatsApp Image 2025-05-27 at 04.05.23_a4cd65ac.webp',
  'WhatsApp Image 2025-05-27 at 04.05.23_d793f725.webp',
  'WhatsApp Image 2025-05-27 at 04.05.24_3635b745.webp',
];

const topicImages = [
  { terms: ['pengiriman', 'ekspor', 'pasar', 'distributor', 'supplier', 'pemasok', 'rantai-pasok', 'grosir'], indexes: [12, 19, 20, 21] },
  { terms: ['rajangan', 'linting', 'pembuatan', 'meracik', 'mesin', 'rokok'], indexes: [8, 9, 10, 11, 13, 14] },
  { terms: ['krosok', 'kering', 'pengeringan', 'fermentasi', 'pasca-panen', 'panen'], indexes: [0, 1, 4, 5, 6, 22] },
  { terms: ['besuki', 'jember', 'virginia', 'madura', 'kasturi', 'temanggung', 'gayo', 'lombok', 'jombang'], indexes: [2, 3, 7, 15, 16, 17, 18] },
  { terms: ['budidaya', 'petani', 'tanam', 'pupuk', 'hama', 'irigasi', 'perkebunan', 'pohon'], indexes: [1, 3, 6, 15, 18, 22] },
];

function imagePath(fileName) {
  return `/Image/${encodeURIComponent(fileName)}`;
}

function stableIndex(value, length) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash % length;
}

export function getArticleImage(post) {
  if (post?.data?.image?.startsWith('/')) {
    return post.data.image;
  }

  const slug = post?.data?.slug || post?.slug || '';
  const title = post?.data?.title || '';
  const key = `${slug} ${title}`.toLowerCase();
  const topic = topicImages.find((item) => item.terms.some((term) => key.includes(term)));
  const pool = topic ? topic.indexes.map((index) => images[index]) : images;

  return imagePath(pool[stableIndex(key, pool.length)]);
}
