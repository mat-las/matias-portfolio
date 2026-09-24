"""Rebuild the explicitly illustrative one-page CV. Requires reportlab."""
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from pathlib import Path
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from fontTools.ttLib import TTFont as FontToolsFont
from fontTools.varLib.instancer import instantiateVariableFont
import tempfile
# Embed static instances of the project’s open-source typeface.
for name,weight in [("Archivo",450),("ArchivoBold",700)]:
    font=FontToolsFont("node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2")
    font=instantiateVariableFont(font,{"wght":weight},inplace=True)
    font.flavor=None
    with tempfile.NamedTemporaryFile(suffix=".ttf") as file:
        font.save(file.name)
        pdfmetrics.registerFont(TTFont(name,file.name))
path = Path('public/downloads/matias-cv-preview.pdf')
path.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(path), pagesize=(595.28,841.89))
c.setTitle('Matias - CV preview - details pending')
c.setAuthor('Matias')
blue=HexColor('#1947e5'); ink=HexColor('#071626'); grey=HexColor('#526170')
c.setFillColor(HexColor('#f1f0eb'));c.rect(0,0,595.28,841.89,fill=1,stroke=0)
c.setFillColor(blue);c.rect(0,817,595.28,25,fill=1,stroke=0)
c.setFont('Archivo',9);c.setFillColor(ink);c.drawString(44,779,'MECHANICAL ENGINEERING / TECHNOLOGY / FINANCE')
c.setFont('ArchivoBold',52);c.setFillColor(blue);c.drawString(42,708,'Matias')
c.setFont('Archivo',15);c.setFillColor(ink);c.drawString(44,674,"Master's graduate in Mechanical Engineering")
c.setFont('Archivo',9);c.setFillColor(grey);c.drawString(44,639,'CV PREVIEW / VERIFIED DETAILS TO BE ADDED')
y=585
sections=[('PROFILE','Mechanical engineering is my foundation. My interests extend across physical systems, computational tools and analytical work in technology and finance.'),('EDUCATION',"Master's graduate in Mechanical Engineering. Institution, exact degree title and attendance dates to be added from the verified CV."),('SELECTED WORK','The portfolio includes illustrative engineering, technology and finance case studies. Project content and results are placeholders and should not be treated as achievements.'),('TECHNICAL TOOLKIT','Example structure: CAD, FEA, CFD and MATLAB; Python, data analysis and Git; financial modelling and quantitative analysis. Capabilities to be verified against real work.'),('EXPERIENCE','Employment, internships, competitions and society roles will be added when verified dates, responsibilities and outcomes are supplied.'),('CONTACT','GitHub: github.com/mat-las. Email and LinkedIn details to be added.')]
for title,body in sections:
 c.setStrokeColor(HexColor('#b9c1c5'));c.setLineWidth(.5);c.line(44,y+15,551,y+15)
 c.setFillColor(blue);c.setFont('ArchivoBold',9);c.drawString(44,y-2,title)
 c.setFillColor(ink);c.setFont('Archivo',10.5)
 lines=simpleSplit(body,'Archivo',10.5,354)
 for i,line in enumerate(lines):c.drawString(195,y-2-i*15,line)
 y-=max(68,len(lines)*15+28)
c.setFillColor(grey);c.setFont('Archivo',8);c.drawString(44,45,'PORTFOLIO PREVIEW - NOT A FINAL APPLICATION CV');c.drawRightString(551,45,'01 / 01')
c.save()
