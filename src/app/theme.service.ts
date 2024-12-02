import { inject, Injectable, signal } from '@angular/core';
import {
  argbFromHex,
  DynamicScheme,
  Hct,
  hexFromArgb,
  rgbaFromArgb,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';
import { toKebabCase } from './kebab';

export enum Scheme {
  Content,
  Expressive,
  Fidelity,
  FruitSalad,
  Monochrome,
  Neutral,
  Rainbow,
  TonalSpot,
  Vibrant,
}

enum ThemeMode {
  Light,
  Dark,
}

type SchemeOptions = {
  isDark?: boolean;
  contrast?: number;
};

export type Color = {
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;
  error: string;
  onError: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  errorContainer: string;
  onErrorContainer: string;
  primaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixed: string;
  onPrimaryFixedVariant: string;
  secondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixed: string;
  onSecondaryFixedVariant: string;
  tertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixed: string;
  onTertiaryFixedVariant: string;
  surface: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainer: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainerHighest: string;
  surfaceContainerHigh: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  inversePrimary: string;
  inverseSurface: string;
  inverseOnSurface: string;
  scrim: string;
  shadow: string;
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly defaultSourceColor = '#7e8c6b';
  currentSourceColor = signal(this.defaultSourceColor);
  currentThemeMode = signal<ThemeMode>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeMode.Dark
      : ThemeMode.Light
  );

  getColorScheme(
    colorHex: string,
    scheme: Scheme = Scheme.Content,
    options?: SchemeOptions
  ): Color {
    this.currentSourceColor.set(colorHex);

    const hct = this.hctFromHex(colorHex);
    let currentScheme: DynamicScheme;

    switch (scheme) {
      case Scheme.Content:
        currentScheme = new SchemeContent(
          hct,
          options?.isDark ?? this.currentThemeMode() === 1 ?? false,
          options?.contrast ?? 0
        );
    }

    let color: Color = {
      primary: '',
      onPrimary: '',
      secondary: '',
      onSecondary: '',
      tertiary: '',
      onTertiary: '',
      error: '',
      onError: '',
      primaryContainer: '',
      onPrimaryContainer: '',
      secondaryContainer: '',
      onSecondaryContainer: '',
      tertiaryContainer: '',
      onTertiaryContainer: '',
      errorContainer: '',
      onErrorContainer: '',
      primaryFixed: '',
      primaryFixedDim: '',
      onPrimaryFixed: '',
      onPrimaryFixedVariant: '',
      secondaryFixed: '',
      secondaryFixedDim: '',
      onSecondaryFixed: '',
      onSecondaryFixedVariant: '',
      tertiaryFixed: '',
      tertiaryFixedDim: '',
      onTertiaryFixed: '',
      onTertiaryFixedVariant: '',
      surface: '',
      surfaceDim: '',
      surfaceBright: '',
      surfaceContainer: '',
      surfaceContainerLowest: '',
      surfaceContainerLow: '',
      surfaceContainerHighest: '',
      surfaceContainerHigh: '',
      onSurface: '',
      onSurfaceVariant: '',
      outline: '',
      outlineVariant: '',
      inversePrimary: '',
      inverseSurface: '',
      inverseOnSurface: '',
      scrim: '',
      shadow: '',
    };

    Object.keys(color).forEach((role) => {
      const rgba = rgbaFromArgb(currentScheme[role as keyof Color]);
      const rgbText = `${rgba.r},${rgba.g},${rgba.b}`;
      color[role as keyof Color] = rgbText;

      document.documentElement.style.setProperty(
        `--dark-${toKebabCase(role)}`,
        rgbText
      );
    });

    return color;
  }

  hctFromHex(color: string) {
    return Hct.fromInt(argbFromHex(color));
  }

  toggleThemeMode() {
    if (this.currentThemeMode() === ThemeMode.Light) {
      this.getColorScheme(this.currentSourceColor(), Scheme.Content, {
        isDark: true,
      });
      this.currentThemeMode.set(ThemeMode.Dark);
    } else {
      this.getColorScheme(this.currentSourceColor(), Scheme.Content, {
        isDark: false,
      });
      this.currentThemeMode.set(ThemeMode.Light);
    }
  }

  toDefaultTheme() {
    this.getColorScheme(this.defaultSourceColor);
  }
}
