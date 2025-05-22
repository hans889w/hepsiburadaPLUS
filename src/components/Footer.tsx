import React from "react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: "YouTube", url: "#", icon: "https://img.icons8.com/ios-filled/50/000000/youtube-play.png" },
  { name: "Facebook", url: "#", icon: "https://img.icons8.com/ios-filled/50/000000/facebook.png" },
  { name: "Twitter", url: "#", icon: "https://img.icons8.com/ios-filled/50/000000/twitter.png" },
  { name: "LinkedIn", url: "#", icon: "https://img.icons8.com/ios-filled/50/000000/linkedin.png" },
  { name: "Pinterest", url: "#", icon: "https://img.icons8.com/ios-filled/50/000000/pinterest.png" },
  { name: "Google Play", url: "#", icon: "https://img.icons8.com/ios-filled/50/000000/google-play.png" },
];

const infoSections = [
  { title: "Alışveriş fırsatları", text: "Türkiye’nin en çok tavsiye edilen e-ticaret markası Hepsiburada, 2001 yılından bu yana hizmet veriyor..." },
  { title: "Teknolojinin En İyi Markaları Hepsiburada’da", text: "Hepsiburada'nın avantajlarla sunduğu elektronik ürünler içinde bilgisayar modellerinden cep telefonu ürünlerine..." },
  { title: "Modanın Nabzını Tutan Tasarımlar Bir Arada", text: "Hepsiburada modayı yakından takip edenlerin de gözdesi..." },
  { title: "Evinizi ve İş Yerinizi Baştan Yaratın", text: "Ev dekorasyon ürünlerinden tekstil ürünlerine kadar her şeyi bulabilirsiniz..." },
  { title: "Aradığınız Yapı Ürünleri Burada", text: "Yapı market ihtiyaçlarınızı Hepsiburada’dan karşılayabilirsiniz..." },
  { title: "Annelerin de Çocukların da Gözdesi", text: "Bebek bezi, oyuncaklar ve anne bakım ürünleri burada..." },
  { title: "Sporu Sevenler Tasarımlar", text: "Spor ayakkabıdan Outdoor ürünlerine, spor ekipmanlarına kadar çeşit çeşit ürün Hepsiburada’da..." },
  { title: "Bakımlı Olmak İçin Aradığınız Her Şey", text: "Kişisel bakım ürünlerinden parfümlere kadar ihtiyacınız olan tüm ürünler burada..." },
  { title: "Kim Demiş Ev Alışverişi Zor Diye?", text: "Süpermarket alışverişinden evcil hayvan ürünlerine kadar her şeyi kapınıza getirin..." },
  { title: "Hobilerinizin İhtiyaçlarınız Tek Adreste", text: "Kitap, film, müzik, boyama ve hobi ürünleri ile dolu kategori sizi bekliyor..." },
  { title: "Hediyeniz Hazır mı?", text: "Binlerce hediye alternatifi Hepsiburada’da..." },
  { title: "Dünyaca Ünlü Markaların Buluşma Noktası", text: "Diesel saatlerden ayakkabılara, Samsung’a tüm ünlü markalar burada..." },
];

const categorySections = [
  {
    title: "Kategoriler",
    items: [
      "Bilgisayar / Tablet / Telefon / Laptop",
      "Kombi / Klimalar",
      "Çamaşır Makinesi / Bulaşık Makinesi",
      "Gram Altın / Yarım Altın",
      "Ayçiçek Yağları",
      "Süpürgeler / Robot Süpürge",
      "Kitap / Film / Müzik",
      "Anne / Bebek",
    ],
  },
  {
    title: "Popüler Telefonlar",
    items: [
      "Samsung Galaxy S25 / S25 Ultra",
      "Xiaomi Android Telefonlar",
      
    ],
  },
  {
    title: "Giyim - Moda",
    items: [
      "Erkek Mont / Kadın Mont",
      "Erkek Bot / Kadın Bot",
      "Ayakkabı / Spor Ayakkabı",
      "Çanta / Elbise / Tunik",
      "Takım Elbise / Sweatshirt",
    ],
  },
  {
    title: "Popüler Markalar",
    items: [
      "Samsung",
      "Asus / Lenovo / HP",
      "Defacto / Koton / Mavi",
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-800 1 w-[117%] h-[970px] mt-[400px] ml-[-100px] pt-10 px-15">
      {/* Renkli Şerit */}
      <div className="flex space-x-1 overflow-x-auto pb-5">
        <div className="h-2 ml-10 w-[200px] bg-[#FF6000]" />
        <div className="h-2 w-32 bg-[#49C7ED]" />
        <div className="h-2 w-32 bg-[#7723DB]" />
        <div className="h-2 w-32 bg-[#57B900]" />
        <div className="h-2 w-32 bg-[#5D196A]" />
        <div className="h-2 w-32 bg-[#5D196A]" />
        <div className="h-2 w-32 bg-[#57B900]" />
        <div className="h-2 w-32 bg-[#7723DB]" />
        <div className="h-2 w-32 bg-[#49C7ED]" />
        <div className="h-2 w-[200px] bg-[#FF6000]" />
      </div>

      {/* Sosyal Medya */}
      <div className="flex justify-center space-x-8 my-7 relative top-[820px] z-50">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url}>
            <img src={link.icon} alt={link.name} className="w-6 h-6" />
          </a>
        ))}
      </div>

      {/* Açıklamalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
      gap-6 max-w-6xl mx-auto text-sm">
        {infoSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="font-semibold text-md mb-1">{section.title}</h3>
            <p>{section.text}</p>
          </div>
        ))}
      </div>

      {/* Alt Menü */}
      <div className="w-[1700px] relative top-20" style={{backgroundColor:"#FFF2EA"}}>
      <div className="mt-12 border-t pt-6 max-w-6xl
       mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm
       w-full">
        {categorySections.map((col, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-2">{col.title}</h4>
            <ul className="space-y-1">
              {col.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Telif Bilgisi */}
      <div className="text-center text-xs text-gray-600 mt-44 mb-4">
        © {currentYear} Hepsiburada Clone. Bu site sadece demo amaçlı hazırlanmıştır.
      </div>
      </div>
    </footer>
  );
};

export default Footer;
