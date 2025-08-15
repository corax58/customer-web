import React from "react";
import { Metadata } from "next";

import { useTranslations } from "next-intl";

import TitleBanner from "../_components/TitleBanner";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Your privacy is important to us. Read the Time-Delivery privacy policy to understand how we collect, use, and protect your personal information.",
};

const PrivacyPage = () => {
  const t = useTranslations("privacy");
  return (
    <div>
      <TitleBanner title={t("header.title")} />
      <div className="content-container flex flex-col gap-12 py-20">
        <section>
          <h2 className="mb-6 text-2xl font-bold">Our Performance</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Sed ac sollicitudin ipsum. Vivamus vulputate, enim sit amet aliquet
            lacinia, ex mauris aliquam elit, vel pharetra augue arcu ultrices
            magna. Suspendisse justo erat, dignissim et imperdiet ut, convallis
            vitae urna. Vivamus tincidunt lacinia rhoncus sed suscipit. Praesent
            lectus rhoncus mauris et euismod. Aliquam elementum malesuada erat,
            vitae bibendum ex rutrum eget. Mauris sed nunc mauris. Curabitur
            tempor sed justo a pellentesque. In hac habitasse platea dictumst.
            Mauris semper volutpat iaculis. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Curabitur
            consectetur dignissim nulla et ornare. Praesent placerat dolor vitae
            tellus lacinia, a molestie est sodales. Praesent at consectetur
            enim, sed scelerisque arcu. Maecenas malesuada lorem id sapien
            scelerisque. In hac habitasse platea dictumst.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Cookie</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Pellentesque sit amet nulla facilisis, lobortis erat, consequat
            diam. Pellentesque sed dui lorem. Aliquam vel euismod nunc. Nulla
            facilisi. Donec consectetur faucibus rutrum. Pellentesque ac
            ultrices sapien, ac iaculis erat. Vivamus posuere eget nulla sit
            amet vehicula. Donec finibus maximus eros, et tincidunt ipsum
            vestibulum ac. Integer vel metus vehicula, consequat velit a,
            eleifend mi. Curabitur erat mauris, luctus non dictum vel, fringilla
            dignissim quam. Phasellus eleifend porta fermentum. Pellentesque
            posuere massa vitae odio pulvinar feugiat. Fusce a risus sodales,
            maximus sapien sit amet, pharetra ipsum. Vivamus varius eros ac
            sapien pulvinar, nec tincidunt dui bibendum. Proin consectetur nibh
            tortor, nec vulputate ex posuere eget.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Payments</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Amet nulla facilisis, lobortis erat, consequat diam. Pellentesque
            sed dui lorem. Aliquam vel euismod nunc. Nulla facilisi. Donec
            consectetur faucibus rutrum. Pellentesque ac ultrices sapien, ac
            iaculis erat. Vivamus posuere eget nulla sit amet vehicula. Donec
            finibus maximus eros, et tincidunt ipsum vestibulum ac. Integer vel
            metus vehicula, consequat velit a, eleifend mi. Curabitur erat
            mauris, luctus non dictum vel, fringilla dignissim quam. Phasellus
            eleifend porta fermentum. Pellentesque posuere massa vitae odio
            pulvinar feugiat. Fusce a risus sodales, maximus sapien sit amet,
            pharetra ipsum. Vivamus varius eros ac sapien pulvinar, nec
            tincidunt dui bibendum. Proin consectetur nibh tortor, nec vulputate
            ex posuere eget.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Refund Policy</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Donec ut vestibulum sem, in faucibus mauris. Nulla et luctus nulla.
            Vestibulum consectetur mauris nec lobortis pretium. Fusce dignissim
            sem in bibendum. Vivamus fermentum tempus lorem vitae vehicula.
            Suspendisse lobortis vehicula ex, vel bibendum ante ornare commodo.
            Curabitur blandit enim nulla, ornare suscipit risus pretium ut.
            Nullam rhoncus, sem eget dapibus elementum, purus dolor ultricies
            magna, nec laoreet odio sapien sit amet erat.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Proin non ante purus. Donec ante enim, semper vel mauris at, rutrum
            blandit mauris. Vivamus ut ante sit amet leo consequat viverra quis
            at odio. Proin arcu magna, placerat sed lorem id, rutrum convallis
            ante.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nam venenatis vestibulum mauris ut viverra. Ut porta consequat lorem
            a ullamcorper. In et arcu quam. Nunc tristique justo nec lectus
            ornare placerat. Nulla ut fringilla mi. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Hyperlinking to our Content
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Sed ac sollicitudin ipsum varius vulputate enim sit amet aliquet
            lacinia mauris aliquam elit:
          </p>
          <ol className="text-muted-foreground ml-4 list-inside list-decimal space-y-2">
            <li>Ut scelerisque hendrerit venenatis</li>
            <li>Proin fermentum lacus nec augue blandit placerat</li>
            <li>Ut vestibulum elit justo suscipit sem ultrices</li>
            <li>Integer fermentum vitae magna in condimentum</li>
            <li>Aenean ultrices neque id pellentesque tincidunt</li>
            <li>Donec ut vestibulum sem, in faucibus mauris</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Donec facilisis consequat mi. Vivamus euismod at ipsum a gravida.
            Quisque vitae augue mauris elit iaculis tincidunt. Quisque dapibus
            dui non justo iaculis volutpat. Phasellus vulputate tempus lorem
            vitae vehicula. Maecenas tristique venenatis ante, scelerisque porta
            nibh mollis vitae. Curabitur sit erat porttitor, imperdiet lectus
            non, porttitor odio. Donec efficitur efficitur dapibus. Aenean sit
            amet tortor id lorem ultrices rhoncus. Etiam ornare eros eu commodo
            vehicula. Curabitur vel enim eget velit tincidunt viverra eu mattis.
            Aliquam suscipit tellus eu fermentum facilisis. Pellentesque
            volutpat posuere ligula. Fusce et consequat mi.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
